import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { createContactSubmission, getRecentContactSubmissions, deleteContactSubmission } from "./db";
import { notifyOwner } from "./_core/notification";
import { syncQuoteToNotion } from "./notion";
import { generateQuoteEmailHTML, generateQuoteEmailText } from "./emailTemplate";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  contact: router({
    submit: publicProcedure
      .input(z.object({
        name: z.string().min(1, "Nome é obrigatório"),
        email: z.string().email("E-mail inválido"),
        phone: z.string().min(10, "Telefone inválido"),
        company: z.string().optional(),
        serviceType: z.enum(["trademark", "priorArt", "both"]),
        serviceLevel: z.string().optional(),
        serviceSpecification: z.string().optional(),
        urgency: z.enum(["low", "normal", "high", "urgent"]),
        projectDescription: z.string().optional(),
        consentMarketing: z.boolean().default(false),
      }))
      .mutation(async ({ input }) => {
        try {
          const submission = await createContactSubmission({
            name: input.name,
            email: input.email,
            phone: input.phone,
            company: input.company || null,
            serviceType: input.serviceType,
            serviceLevel: input.serviceLevel || null,
            urgency: input.urgency,
            projectDescription: input.projectDescription || null,
            consentMarketing: input.consentMarketing ? 1 : 0,
            status: "new",
          });

          // Service type and urgency labels
          const serviceTypeLabel = {
            trademark: "Registro de Marca",
            priorArt: "Busca por Anterioridades",
            both: "Ambos os Serviços",
          }[input.serviceType];

          const urgencyLabel = {
            low: "Baixa",
            normal: "Normal",
            high: "Alta",
            urgent: "Urgente",
          }[input.urgency];

          // Send notification to owner
          await notifyOwner({
            title: `Novo Orçamento Solicitado - ${input.name}`,
            content: `Nova solicitação de orçamento recebida:\n\nNome: ${input.name}\nE-mail: ${input.email}\nTelefone: ${input.phone}\nEmpresa: ${input.company || "Não informado"}\nServiço: ${serviceTypeLabel}\nUrgência: ${urgencyLabel}\n\nDescrição: ${input.projectDescription || "Não informado"}`,
          });

          // Sync to Notion
          try {
            await syncQuoteToNotion({
              name: input.name,
              email: input.email,
              phone: input.phone,
              company: input.company,
              serviceType: serviceTypeLabel,
              serviceSpecification: input.serviceSpecification,
              urgency: urgencyLabel,
              description: input.projectDescription,
            });
          } catch (notionError) {
            console.error('[Contact] Failed to sync to Notion:', notionError);
            // Don't throw - Notion sync failure shouldn't block form submission
          }

          // Send professional quote email to client
          try {
            const quoteEmailHtml = generateQuoteEmailHTML({
              clientName: input.name,
              clientEmail: input.email,
              clientPhone: input.phone,
              clientCompany: input.company,
              serviceType: serviceTypeLabel,
              serviceSpecification: input.serviceSpecification,
              urgency: urgencyLabel,
              projectDescription: input.projectDescription,
              submissionDate: new Date(),
            });

            const quoteEmailText = generateQuoteEmailText({
              clientName: input.name,
              clientEmail: input.email,
              clientPhone: input.phone,
              clientCompany: input.company,
              serviceType: serviceTypeLabel,
              serviceSpecification: input.serviceSpecification,
              urgency: urgencyLabel,
              projectDescription: input.projectDescription,
              submissionDate: new Date(),
            });

            // Send to client
            await fetch(process.env.BUILT_IN_FORGE_API_URL + '/email/send', {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${process.env.BUILT_IN_FORGE_API_KEY}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                to: input.email,
                subject: 'Seu Orçamento - Hudson Souza Advocacia',
                text: quoteEmailText,
                html: quoteEmailHtml,
              }),
            });

            // Send copy to Hudson (hudpaivasouza@gmail.com)
            await fetch(process.env.BUILT_IN_FORGE_API_URL + '/email/send', {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${process.env.BUILT_IN_FORGE_API_KEY}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                to: 'hudpaivasouza@gmail.com',
                subject: `Novo Orçamento: ${input.name} - ${serviceTypeLabel}`,
                text: quoteEmailText,
                html: quoteEmailHtml,
              }),
            });
          } catch (emailError) {
            console.error('[Contact] Failed to send quote email:', emailError);
            // Don't throw - email failure shouldn't block form submission
          }

          return {
            success: true,
            message: "Orçamento solicitado com sucesso! Entraremos em contato em breve.",
          };
        } catch (error) {
          console.error("[Contact] Failed to submit form:", error);
          throw new Error("Falha ao enviar formulário. Tente novamente.");
        }
      }),

    getRecent: publicProcedure.query(async () => {
      try {
        const submissions = await getRecentContactSubmissions(10);
        return submissions;
      } catch (error) {
        console.error("[Contact] Failed to get submissions:", error);
        return [];
      }
    }),

    delete: publicProcedure
      .input(z.object({
        id: z.number(),
      }))
      .mutation(async ({ input }) => {
        try {
          await deleteContactSubmission(input.id);
          return { success: true };
        } catch (error) {
          console.error("[Contact] Failed to delete submission:", error);
          throw new Error("Falha ao deletar orçamento.");
        }
      })
  }),
});

export type AppRouter = typeof appRouter;
