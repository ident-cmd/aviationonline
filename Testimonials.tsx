import { motion } from 'motion/react';

export default function TermsOfService() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 md:p-12 rounded-3xl border border-zinc-200 shadow-sm"
      >
        <h1 className="text-3xl font-bold text-zinc-900 mb-8">Conditions Générales d'Utilisation (CGU)</h1>
        
        <section className="space-y-8 text-zinc-600">
          <div>
            <h2 className="text-xl font-bold text-zinc-900 mb-4">1. Objet</h2>
            <p className="leading-relaxed">
              Les présentes Conditions Générales d'Utilisation (CGU) ont pour objet de définir les modalités de mise à disposition des services du site Aviation Online. 
              Toute utilisation du site implique l'acceptation pleine et entière des présentes conditions par l'utilisateur.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-zinc-900 mb-4">2. Accès aux services et Tarifs</h2>
            <p className="leading-relaxed">
              L'accès aux modules de formation est réservé aux utilisateurs ayant souscrit à l'offre payante. 
              Le tarif en vigueur est de <strong>79€ TTC</strong> pour un accès à vie (sauf modification ultérieure des conditions). 
              Le paiement s'effectue par carte bancaire via la plateforme sécurisée <strong>Stripe</strong>.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-zinc-900 mb-4">3. Droit de rétractation et Remboursement</h2>
            <p className="leading-relaxed">
              Conformément à l'article L221-28 du Code de la consommation, le droit de rétractation ne peut être exercé pour les contrats de fourniture d'un contenu numérique non fourni sur un support matériel dont l'exécution a commencé après accord préalable exprès du consommateur et renoncement exprès à son droit de rétractation.
            </p>
            <p className="mt-2 leading-relaxed italic">
              En accédant immédiatement aux modules de formation après paiement, l'utilisateur accepte de renoncer à son droit de rétractation de 14 jours.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-zinc-900 mb-4">4. Propriété intellectuelle</h2>
            <p className="leading-relaxed">
              Les contenus de formation (vidéos, textes, schémas, QCM) sont protégés par le droit d'auteur. Ils sont destinés à un usage strictement personnel et non transférable. 
              Toute reproduction, diffusion, partage de compte ou utilisation à des fins commerciales est strictement interdite et pourra faire l'objet de poursuites.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-zinc-900 mb-4">5. Responsabilité</h2>
            <p className="leading-relaxed">
              Aviation Online s'efforce de fournir des informations pédagogiques de haute qualité. Toutefois, ces formations sont à but informatif et ne remplacent en aucun cas une formation officielle dispensée par un organisme agréé (ATO/DTO). 
              L'éditeur ne saurait être tenu responsable des résultats aux examens officiels ou de l'utilisation faite de ces connaissances en vol réel.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-zinc-900 mb-4">6. Règlement des litiges</h2>
            <p className="leading-relaxed">
              Les présentes CGU sont soumises à la loi française. En cas de litige, et après tentative de résolution amiable, compétence est attribuée aux tribunaux français compétents.
            </p>
          </div>
        </section>
      </motion.div>
    </div>
  );
}
