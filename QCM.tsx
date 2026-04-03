import { useState } from 'react';
import { useAuth } from '../App';
import { useSearchParams } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Plane, CheckCircle2, Shield, CreditCard, Lock, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Payment() {
  const { user, profile } = useAuth();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const isInIframe = window.self !== window.top;
  const isCancelled = searchParams.get('payment') === 'cancel';

  const handlePayment = async () => {
    if (!user) {
      alert("Veuillez vous connecter pour procéder au paiement.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user?.uid, email: user?.email }),
      });

      const session = await response.json();
      if (!response.ok || session.error) {
        throw new Error(session.error || `Erreur serveur (${response.status})`);
      }

      if (session.url) {
        // If we are in an iframe (like AI Studio preview), redirecting the current window might be blocked by Stripe's CSP (frame-ancestors)
        // or just look broken. Opening in a new tab is safer for iframes.
        if (isInIframe) {
          window.open(session.url, '_blank');
          // Also show a message in case the popup was blocked
          alert("La page de paiement Stripe s'ouvre dans un nouvel onglet. Si rien ne se passe, veuillez autoriser les popups ou ouvrir l'application dans un nouvel onglet.");
        } else {
          window.location.href = session.url;
        }
      } else {
        throw new Error("URL de session Stripe manquante.");
      }
    } catch (error: any) {
      console.error("Payment Error:", error);
      alert(`Erreur de paiement : ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (profile?.isPaid) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center">
          <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-zinc-900 mb-2">Vous avez déjà accès !</h1>
          <p className="text-zinc-500 mb-8">Votre abonnement est actif. Profitez de votre formation.</p>
          <a href="/dashboard" className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors">
            Aller au tableau de bord
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <AnimatePresence>
        {isCancelled && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 bg-rose-50 border border-rose-100 rounded-2xl text-rose-600 text-sm flex items-center gap-3"
          >
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            Le paiement a été annulé. Vous pouvez réessayer quand vous le souhaitez.
          </motion.div>
        )}
        {isInIframe && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 bg-amber-50 border border-amber-100 rounded-2xl text-amber-600 text-sm flex items-center gap-3"
          >
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            Note : Vous êtes dans un aperçu. Pour un paiement sécurisé, veuillez ouvrir l'application dans un nouvel onglet.
          </motion.div>
        )}
      </AnimatePresence>

      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-zinc-900 mb-4">Débloquez votre Formation IR</h1>
        <p className="text-xl text-zinc-500">Un investissement pour votre carrière de pilote.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="flex gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-bold text-zinc-900 mb-1">Accès Illimité</h3>
              <p className="text-sm text-zinc-500">Tous les modules actuels et futurs inclus sans frais supplémentaires.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h3 className="font-bold text-zinc-900 mb-1">Pédagogie d'Expert</h3>
              <p className="text-sm text-zinc-500">Des cours structurés par des instructeurs IFR pour une réussite garantie.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Lock className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-bold text-zinc-900 mb-1">Paiement Sécurisé</h3>
              <p className="text-sm text-zinc-500">Transaction sécurisée via Stripe. Vos données sont protégées.</p>
            </div>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-3xl border border-zinc-200 shadow-2xl p-8 md:p-12 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold px-4 py-1 rounded-bl-xl uppercase tracking-widest">
            Offre Lancement
          </div>
          <div className="mb-8">
            <h2 className="text-zinc-900 font-bold text-lg mb-2">Formation Complète IR</h2>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-bold text-zinc-900">79€</span>
              <span className="text-zinc-400 line-through">149€</span>
            </div>
          </div>

          <ul className="space-y-4 mb-10">
            <li className="flex items-center gap-3 text-sm text-zinc-600">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Accès à vie
            </li>
            <li className="flex items-center gap-3 text-sm text-zinc-600">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Support par email
            </li>
            <li className="flex items-center gap-3 text-sm text-zinc-600">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Certificat de complétion
            </li>
          </ul>

          <button
            onClick={handlePayment}
            disabled={loading}
            className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? "Initialisation..." : (
              <>
                <CreditCard className="w-5 h-5" /> Payer maintenant
              </>
            )}
          </button>
          
          <p className="text-center text-[10px] text-zinc-400 mt-4">
            En cliquant, vous acceptez nos conditions générales de vente.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
