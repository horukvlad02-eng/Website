import { L } from "@/components/site/L";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export const CONSENT: Record<
  Locale,
  { body: string; see: string; privacy: string; and: string; terms: string; missing: string }
> = {
  en: {
    body: "I agree that Centurion Roofing may contact me by phone call and text message, including through automated technology, at the number I provided about my request. Consent is not a condition of purchase. Message and data rates may apply. Reply STOP to opt out or HELP for help.",
    see: "See our",
    privacy: "Privacy Policy",
    and: "and",
    terms: "Terms of Use",
    missing: "Please tick the box to agree to be contacted.",
  },
  es: {
    body: "Acepto que Centurion Roofing pueda contactarme por llamada telefónica y mensaje de texto, incluso mediante tecnología automatizada, al número que proporcioné, en relación con mi solicitud. El consentimiento no es condición de compra. Pueden aplicar tarifas de mensajes y datos. Responda STOP para cancelar o HELP para recibir ayuda.",
    see: "Consulte nuestra",
    privacy: "Política de privacidad",
    and: "y los",
    terms: "Términos de uso",
    missing: "Marque la casilla para aceptar que le contactemos.",
  },
  fr: {
    body: "J’accepte que Centurion Roofing me contacte par appel téléphonique et par SMS, y compris au moyen d’une technologie automatisée, au numéro que j’ai fourni, au sujet de ma demande. Le consentement n’est pas une condition d’achat. Des frais de messages et de données peuvent s’appliquer. Répondez STOP pour vous désinscrire ou HELP pour obtenir de l’aide.",
    see: "Consultez notre",
    privacy: "politique de confidentialité",
    and: "et nos",
    terms: "conditions d’utilisation",
    missing: "Veuillez cocher la case pour accepter d’être contacté.",
  },
};

/** SMS/phone consent checkbox (TCPA wording) shared by every lead form. */
export function Consent({
  locale,
  idPrefix,
  error,
  checked,
  onChange,
  tone = "light",
}: {
  locale: Locale;
  idPrefix: string;
  error?: string | undefined;
  checked: boolean;
  onChange: (v: boolean) => void;
  tone?: "light" | "dark";
}) {
  const t = CONSENT[locale];
  const id = `${idPrefix}-consent`;
  const errId = `${id}-error`;
  return (
    <div className="mt-1">
      <div className="flex items-start gap-3">
        <input
          id={id}
          type="checkbox"
          name="consent"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          aria-invalid={!!error}
          aria-describedby={error ? errId : undefined}
          className="mt-0.5 size-5 shrink-0 cursor-pointer rounded border-2 accent-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        />
        <label
          htmlFor={id}
          className={cn(
            "cursor-pointer text-xs leading-relaxed",
            tone === "dark" ? "text-white/55" : "text-muted-foreground",
          )}
        >
          {t.body}{" "}
          <span className="whitespace-nowrap">
            {t.see}{" "}
            <L
              target="_blank"
              rel="noopener"
              className={cn(
                "underline underline-offset-2",
                tone === "dark" ? "hover:text-white" : "hover:text-ink",
              )}
              to="/privacy/"
            >
              {t.privacy}
            </L>{" "}
            {t.and}{" "}
            <L
              target="_blank"
              rel="noopener"
              className={cn(
                "underline underline-offset-2",
                tone === "dark" ? "hover:text-white" : "hover:text-ink",
              )}
              to="/terms/"
            >
              {t.terms}
            </L>
            .
          </span>
        </label>
      </div>
      {error ? (
        <p id={errId} className="mt-1.5 text-sm font-medium text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}
