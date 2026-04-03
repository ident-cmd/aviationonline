import { motion } from 'motion/react';

export default function LegalMentions() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 md:p-12 rounded-3xl border border-zinc-200 shadow-sm"
      >
        <h1 className="text-3xl font-bold text-zinc-900 mb-8">Mentions Légales</h1>
        
        <section className="space-y-6 text-zinc-600">
          <div>
            <h2 className="text-xl font-bold text-zinc-900 mb-3">1. Éditeur du site</h2>
            <p className="mb-2">Le site <strong>Aviation Online</strong> est édité par :</p>
            <p className="font-bold text-zinc-900">Jean-Claude CHENARD</p>
            <p>Entrepreneur Individuel (EI)</p>
            <p>Siège social : 1bis, Avenue Justin Maurice 47520 LE PASSAGE</p>
            <p>SIRET : 791 546 419</p>
            <p>TVA Intracommunautaire : Non applicable, art. 293 B du CGI</p>
            <p>Email : contact@aviationonline.net</p>
            <p>Téléphone : 06 63 09 10 36</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-zinc-900 mb-3">2. Directeur de la publication</h2>
            <p>Monsieur Jean-Claude CHENARD</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-zinc-900 mb-3">3. Hébergement</h2>
            <p>Le site est hébergé par :</p>
            <p className="font-bold text-zinc-900">Google Cloud Platform</p>
            <p>Google Cloud France SARL</p>
            <p>8 Rue de Londres, 75009 Paris, France</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-zinc-900 mb-3">4. Propriété intellectuelle</h2>
            <p className="leading-relaxed">
              L'ensemble des éléments constituant le site Aviation Online (textes, graphismes, logiciels, photographies, images, vidéos, sons, plans, noms, logos, marques, créations et œuvres protégeables diverses, bases de données, etc.) ainsi que le site lui-même, relèvent des législations françaises et internationales sur le droit d'auteur et la propriété intellectuelle.
            </p>
            <p className="mt-2 leading-relaxed">
              Ces éléments sont la propriété exclusive de Jean-Claude CHENARD. Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-zinc-900 mb-3">5. Données personnelles (RGPD)</h2>
            <p className="leading-relaxed">
              Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition aux données personnelles vous concernant. Pour exercer ce droit, vous pouvez nous contacter par email à : <strong>contact@aviationonline.net</strong>.
            </p>
          </div>
        </section>
      </motion.div>
    </div>
  );
}
