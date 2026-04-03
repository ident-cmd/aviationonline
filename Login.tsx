import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Plane, Shield, BookOpen, Users, ChevronRight, CheckCircle2, Radio, FileText, Map, Award, Quote, GraduationCap, Star } from 'lucide-react';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

interface Module {
  id: string;
  title: string;
  description: string;
  order: number;
}

interface Testimonial {
  id: string;
  text: string;
  author: string;
  role: string;
  rating: number;
  order: number;
}

export default function Home() {
  const [modules, setModules] = useState<Module[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    const qModules = query(collection(db, 'modules'));
    const unsubscribeModules = onSnapshot(qModules, (snapshot) => {
      const mods = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Module));
      const sortedMods = mods.sort((a, b) => (a.order || 999) - (b.order || 999));
      setModules(sortedMods);
    }, (err) => handleFirestoreError(err, OperationType.LIST, 'modules'));

    const qTestimonials = query(collection(db, 'testimonials'));
    const unsubscribeTestimonials = onSnapshot(qTestimonials, (snapshot) => {
      const tests = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Testimonial));
      const sortedTests = tests.sort((a, b) => (a.order || 999) - (b.order || 999));
      setTestimonials(sortedTests);
    }, (err) => handleFirestoreError(err, OperationType.LIST, 'testimonials'));

    return () => {
      unsubscribeModules();
      unsubscribeTestimonials();
    };
  }, []);

  const getIconForModule = (index: number) => {
    const icons = [Plane, Radio, Map, FileText, Shield, BookOpen, Award, GraduationCap];
    return icons[index % icons.length];
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden py-20 md:py-0">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&q=80&w=2000" 
            alt="Avion en vol" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-zinc-900/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-zinc-900" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white tracking-tight mb-6">
              Maîtrisez le <span className="text-blue-500 italic">Vol et les Procédures IFR</span>
            </h1>
            <p className="text-lg md:text-xl text-zinc-300 max-w-4xl mx-auto mb-10 leading-relaxed">
              La plateforme de référence pour les pilotes envisageant ou en cours de formation pratique IR, 
              ainsi que pour les pilotes qualifiés souhaitant maintenir leur niveau pour une prorogation 
              ou une sélection compagnie.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all transform hover:scale-105 flex items-center justify-center gap-2">
                Commencer la formation <ChevronRight className="w-5 h-5" />
              </Link>
              <a href="#pricing" className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl backdrop-blur-sm transition-all flex items-center justify-center gap-2">
                Accès complet à 79€
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="p-8 rounded-2xl bg-zinc-50 border border-zinc-100 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 mb-4">Expertise Instructeur</h3>
              <p className="text-zinc-600 leading-relaxed">
                Formation conçue par un instructeur expert avec plus de 30 ans d'expérience en ATO.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-zinc-50 border border-zinc-100 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-6">
                <BookOpen className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 mb-4">Pédagogie IFR</h3>
              <p className="text-zinc-600 leading-relaxed">
                Une approche structurée pour maîtriser le pilotage sans visibilité et réussir vos sélections en compagnie aérienne.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-zinc-50 border border-zinc-100 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 mb-4">Succès Étudiants</h3>
              <p className="text-zinc-600 leading-relaxed">
                Des centaines de pilotes formés qui volent aujourd'hui en compagnie grâce à mes méthodes éprouvées.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center"
            >
              <div className="text-4xl font-black text-blue-500 mb-2">+500</div>
              <div className="text-zinc-400 uppercase tracking-widest text-xs font-bold">Slides de cours</div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex flex-col items-center border-y md:border-y-0 md:border-x border-zinc-800 py-8 md:py-0"
            >
              <div className="text-4xl font-black text-blue-500 mb-2">11h</div>
              <div className="text-zinc-400 uppercase tracking-widest text-xs font-bold">Vidéos pédagogiques</div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center"
            >
              <div className="text-4xl font-black text-blue-500 mb-2">260</div>
              <div className="text-zinc-400 uppercase tracking-widest text-xs font-bold">Questions de QCM</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Highlight Section */}
      <section id="pricing" className="py-12 bg-blue-50 border-y border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl md:rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-blue-900/5 border border-blue-100 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wider mb-4">
                <Star className="w-4 h-4" /> Offre Spéciale
              </div>
              <h2 className="text-3xl font-bold text-zinc-900 mb-4 tracking-tight">Accès Illimité à Vie</h2>
              <p className="text-zinc-600 leading-relaxed mb-6">
                Profitez de l'intégralité des modules, des schémas pédagogiques et du support instructeur pour un tarif unique et définitif.
              </p>
              <div className="grid grid-cols-3 gap-4 border-t border-zinc-100 pt-6">
                <div>
                  <div className="text-lg font-bold text-zinc-900">+500</div>
                  <div className="text-[10px] text-zinc-400 uppercase font-bold">Slides</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-zinc-900">11h</div>
                  <div className="text-[10px] text-zinc-400 uppercase font-bold">Vidéo</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-zinc-900">260</div>
                  <div className="text-[10px] text-zinc-400 uppercase font-bold">QCM</div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center md:items-end gap-4">
              <div className="text-center md:text-right">
                <div className="text-5xl font-black text-blue-600 mb-1">79€</div>
                <div className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Paiement unique</div>
              </div>
              <Link to="/login" className="px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-200 transition-all transform hover:scale-105">
                S'inscrire maintenant
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="py-24 bg-zinc-50 border-y border-zinc-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4 tracking-tight">Une formation adaptée à votre parcours</h2>
            <p className="text-zinc-600 max-w-2xl mx-auto">
              Que vous soyez en début de formation ou pilote expérimenté, nos modules répondent à vos besoins spécifiques.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl md:rounded-[2.5rem] border border-zinc-200 shadow-sm hover:shadow-xl transition-all group">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Plane className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 mb-4">Envisageant une qualification IR</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Préparez le terrain avant même de monter dans l'avion. Familiarisez-vous avec les concepts 
                fondamentaux, le circuit visuel et la philosophie du vol aux instruments pour aborder 
                votre formation pratique avec une longueur d'avance.
              </p>
            </div>
            <div className="bg-white p-8 rounded-3xl md:rounded-[2.5rem] border border-zinc-200 shadow-sm hover:shadow-xl transition-all group">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <GraduationCap className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 mb-4">En cours de formation pratique IR</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Complétez vos séances en vol par une base théorique solide et des procédures claires. 
                Gagnez en sérénité et en efficacité lors de vos passages au simulateur ou en avion en maîtrisant 
                parfaitement les trajectoires.
              </p>
            </div>
            <div className="bg-white p-8 rounded-3xl md:rounded-[2.5rem] border border-zinc-200 shadow-sm hover:shadow-xl transition-all group">
              <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Award className="w-7 h-7 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 mb-4">Maintien de compétences & Sélections</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Pilotes déjà qualifiés : révisez vos classiques pour une prorogation ou préparez-vous 
                aux exigences des sélections en compagnie aérienne. Maintenez un niveau d'excellence 
                technique et opérationnel constant.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Instructor Bio Section */}
      <section className="py-24 bg-zinc-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/10 blur-3xl -z-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-6">
                <Award className="w-4 h-4" /> Votre Instructeur
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 tracking-tight">
                Jean-Claude CHENARD <span className="text-blue-500 italic">MCCI</span>
              </h2>
              <div className="space-y-6 text-zinc-400 text-lg leading-relaxed">
                <p className="text-white font-medium">
                  Instructeur sur simulateur de vol depuis 1985, expert en pédagogie aéronautique avec plus de 25 000 heures d'instruction.
                </p>
                <div className="space-y-4">
                  <ul className="grid grid-cols-1 gap-y-3 text-sm">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" />
                      <span>Formations IFR/IR de pilotes de ligne et de pilotes privés.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" />
                      <span>Formateur d’instructeurs IR (IRI).</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" />
                      <span>Formations MCC (travail en équipage) MCCI.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" />
                      <span>Formateur d’instructeurs MCC (I-MCCI).</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-6 border-t border-zinc-800">
                  <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 mb-4 font-bold">Parcours & Qualifications</p>
                  <div className="grid grid-cols-1 gap-3 text-sm">
                    <div className="flex justify-between items-center py-2 border-b border-zinc-800/50">
                      <span className="text-zinc-300">Armée de l’Air</span>
                      <span className="text-blue-400 font-mono">1985 — 1989</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-zinc-800/50">
                      <span className="text-zinc-300">EPAG (Groupe Air France)</span>
                      <span className="text-blue-400 font-mono">1989 — 1994</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-zinc-800/50">
                      <span className="text-zinc-300">Airways Formation</span>
                      <span className="text-blue-400 font-mono">1994 — 2021</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {[
                    { tag: 'STI', label: 'Synthetic Training Instructor' },
                    { tag: 'CGI', label: 'Chief Ground Instructor' },
                    { tag: 'MCCI', label: 'Multi Crew Coopération Instructor' }
                  ].map(({ tag, label }) => (
                    <div key={tag} className="group relative">
                      <span className="px-2 py-1 bg-blue-500/10 text-blue-400 rounded border border-blue-500/20 text-[10px] font-black tracking-widest uppercase cursor-help">
                        {tag}
                      </span>
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-zinc-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-20">
                        {label}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-8 pt-8">
                  <div>
                    <div className="text-3xl font-bold text-white mb-1">25k+</div>
                    <div className="text-sm uppercase tracking-widest text-zinc-500">Heures d'Instruction</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-white mb-1">35+</div>
                    <div className="text-sm uppercase tracking-widest text-zinc-500">Années d'Expérience</div>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1517479149777-5f3b1511d5ad?auto=format&fit=crop&q=80&w=1000" 
                  alt="Cockpit IFR" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-blue-600 p-8 rounded-2xl shadow-2xl hidden md:block">
                <GraduationCap className="w-12 h-12 text-white mb-4" />
                <div className="text-white font-bold text-xl italic">"La rigueur de l'IFR, <br />la sérénité du pro."</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Modules Preview */}
      <section id="modules" className="py-24 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4">Programme de Formation</h2>
            <p className="text-zinc-600 max-w-2xl mx-auto">
              Un parcours complet divisé en modules thématiques pour une progression logique et efficace.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {modules.length > 0 ? (
              modules.map((module, idx) => {
                const Icon = getIconForModule(idx);
                return (
                  <div key={module.id} className="bg-white p-6 rounded-2xl border border-zinc-200 hover:border-blue-500 transition-colors group">
                    <Icon className="w-10 h-10 text-zinc-400 group-hover:text-blue-600 mb-4 transition-colors" />
                    <h4 className="font-bold text-zinc-900 mb-2">{module.title}</h4>
                    <p className="text-sm text-zinc-500 line-clamp-3">{module.description}</p>
                  </div>
                );
              })
            ) : (
              [
                { title: "Pilotage Sans Visibilité", icon: Plane, desc: "Assiette, inclinaison et circuit visuel." },
                { title: "Moyens Radio", icon: Radio, desc: "VOR, ADF, ILS et GNSS." },
                { title: "Attentes & Procédures", icon: Map, desc: "Entrées et maintien des hippodromes." },
                { title: "Réglementation IFR", icon: FileText, desc: "Espaces aériens et minima météo." }
              ].map((module, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-zinc-200 hover:border-blue-500 transition-colors group">
                  <module.icon className="w-10 h-10 text-zinc-400 group-hover:text-blue-600 mb-4 transition-colors" />
                  <h4 className="font-bold text-zinc-900 mb-2">{module.title}</h4>
                  <p className="text-sm text-zinc-500">{module.desc}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4 tracking-tight">Témoignages de mes stagiaires</h2>
            <p className="text-zinc-600 max-w-2xl mx-auto mb-12">
              Découvrez les retours d'expérience de pilotes qui ont réussi leur formation et volent aujourd'hui en compagnie.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {(testimonials.length > 0 ? testimonials.slice(0, 3) : [
                { 
                  author: "Maxime Laudat", 
                  role: "OPL Air France / Transavia",
                  text: "Ses connaissances du métier, sa pédagogie et sa gentillesse nous ont permis de suivre sereinement cette formation, ainsi que de trouver un travail en compagnie.",
                  rating: 5
                },
                { 
                  author: "Falk WINKLER", 
                  role: "Captain A220 Air France",
                  text: "Jean-Claude n’était pas là pour nous faire passer une séance. Il était là pour nous faire comprendre que la séance du jour était le reflet d’incidents réels rencontrés en vol.",
                  rating: 5
                },
                { 
                  author: "Frédéric Echassoux", 
                  role: "CDB Transavia / Air France",
                  text: "Jean-Claude est de ces instructeurs-là, il sait ajuster votre surcharge de travail au point exact ou vous allez progresser. Il y a des instructeurs et il y a Jean-Claude Chenard.",
                  rating: 5
                }
              ]).map((t, i) => (
                <div key={i} className="bg-zinc-50 p-8 rounded-3xl border border-zinc-100 text-left relative">
                  <Quote className="w-10 h-10 text-blue-600/10 absolute top-6 right-6" />
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star key={star} className={`w-3 h-3 ${star <= (t.rating || 5) ? 'fill-amber-400 text-amber-400' : 'text-zinc-200'}`} />
                    ))}
                  </div>
                  <p className="text-zinc-600 italic text-sm mb-6 leading-relaxed">
                    "{t.text}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                      {t.author ? t.author[0] : '?'}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-zinc-900">{t.author}</div>
                      <div className="text-[10px] text-zinc-500 uppercase tracking-widest">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative group max-w-2xl mx-auto">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <Link 
                to="/testimonials" 
                className="relative flex flex-col items-center gap-6 p-8 md:p-12 bg-zinc-50 rounded-3xl border border-zinc-100 hover:border-blue-500 transition-all text-center"
              >
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-16 h-16 rounded-full border-4 border-white bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl overflow-hidden">
                      <img 
                        src={`https://picsum.photos/seed/pilot${i}/100/100`} 
                        alt="Pilot" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  ))}
                  <div className="w-16 h-16 rounded-full border-4 border-white bg-blue-600 flex items-center justify-center text-white font-bold text-xl">
                    +
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-zinc-900 mb-2">Consulter tous les avis</h3>
                  <p className="text-zinc-600 leading-relaxed mb-6">
                    Retrouvez l'intégralité des témoignages de mes élèves pilotes sur notre page dédiée.
                  </p>
                  <div className="inline-flex items-center gap-2 text-blue-600 font-bold group-hover:translate-x-2 transition-transform">
                    Voir les témoignages <ChevronRight className="w-6 h-6" />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Prêt à franchir le pas vers l'IFR ?</h2>
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 max-w-3xl mx-auto border border-white/20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left">
                <div className="text-white text-4xl font-bold mb-2">79€ <span className="text-lg font-normal opacity-80">/ accès à vie</span></div>
                <ul className="space-y-2 text-white/90 text-sm flex flex-col items-center md:items-start">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Tous les modules théoriques</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Mises à jour gratuites</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Support instructeur</li>
                </ul>
              </div>
              <Link to="/login" className="w-full md:w-auto px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-zinc-100 transition-colors">
                S'inscrire maintenant
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
