// A PostHog do site, pelo contrato do Nexus (~/projects/nexus/knowledge/metricas.md). O projeto
// PostHog é UM SÓ para todas as frentes (plano grátis), então todo evento leva `frente` e
// `projeto`, e o volume é contado: sem autocapture e sem gravação de sessão, só pageview,
// pageleave e os erros de JavaScript do navegador.
//
// Roda no cliente antes da página ficar interativa (convenção do Next). Sem
// NEXT_PUBLIC_POSTHOG_KEY nada roda: dev local e deploy antes da env ficam mudos.
import posthog from 'posthog-js';

const chave = process.env.NEXT_PUBLIC_POSTHOG_KEY;

if (chave) {
  posthog.init(chave, {
    // proxy reverso pelo rewrite do next.config: bloqueador de anúncio não corta o que passa
    // pelo próprio domínio
    api_host: '/ingest',
    ui_host: 'https://us.posthog.com',
    capture_pageview: 'history_change',
    capture_pageleave: true,
    autocapture: false,
    disable_session_recording: true,
    // erro não tratado e promise rejeitada viram $exception, na cota própria de error tracking
    capture_exceptions: true,
    // sem cookie: o identificador anônimo mora no localStorage
    persistence: 'localStorage',
    person_profiles: 'identified_only',
  });
  posthog.register({ frente: 'fui-multado', projeto: 'fui-multado' });
}
