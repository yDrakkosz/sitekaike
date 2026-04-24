import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, 
  MessageCircle, 
  Clock, 
  Utensils, 
  GlassWater, 
  Baby, 
  CalendarDays, 
  ChevronRight,
  Phone,
  Heart,
  Star,
  CheckCircle2,
  Send,
  ArrowUp
} from 'lucide-react';

const WHATSAPP_NUMBER = "5511971978640";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=Ol%C3%A1%2C%20gostaria%20de%20fazer%20uma%20reserva%20ou%20pedir%20informa%C3%A7%C3%B5es.`;

type MenuItem = {
  nome: string;
  desc: string;
  preco: string;
  badge?: string;
};

const MENU: Record<string, MenuItem[]> = {
  entradas: [
    { nome: 'Dadinhos de Tapioca', desc: 'Com queijo coalho, servidos com nossa geleia de pimenta caseira.', preco: 'R$ 38,00', badge: 'Vegetariano' },
    { nome: 'Pastelzinho Nordestino', desc: 'Porção com 6 unidades: carne seca com abóbora e queijo coalho.', preco: 'R$ 42,00' },
    { nome: 'Caldinho de Feijão', desc: 'Acompanha torresminho crocante, cebolinha e pão de alho da casa.', preco: 'R$ 22,00' },
  ],
  principais: [
    { nome: 'Feijoada Completa', desc: 'Nossa tradicional feijoada, servida com arroz, couve, torresmo crocante, farofa e laranja. (Quartas e Sábados)', preco: 'R$ 139,90', badge: 'Especialidade' },
    { nome: 'Arrumadão Poti', desc: 'Carne de sol artesanal fatiada, baião de dois cremoso e mandioca na manteiga de garrafa derretendo.', preco: 'R$ 145,00', badge: 'Mais Pedido' },
    { nome: 'Picanha na Parrilla', desc: 'Picanha premium fatiada, acompanhada de arroz biro-biro, farofa de ovos e vinagrete da casa.', preco: 'R$ 179,00' },
    { nome: 'Cupim Braseado', desc: 'Assado lentamente na cerveja preta até desmanchar. Acompanha purê rústico de batatas.', preco: 'R$ 155,00' },
    { nome: 'Moqueca Mista', desc: 'Polvo, lula, camarão e peixe branco em azeite de dendê. Acompanha farofa de dendê e arroz.', preco: 'R$ 189,00' }
  ],
  executivos: [
    { nome: 'Picadinho Paulista', desc: 'Acompanha arroz, feijão fresco, farofa, banana à milanesa e ovo frito.', preco: 'R$ 45,90' },
    { nome: 'Estrogonofe Clássico', desc: 'De carne ou frango, com arroz branco, champignon e batata palha caseira.', preco: 'R$ 42,90' }
  ],
  sobremesas: [
    { nome: 'Pudim de Leite', desc: 'O clássico sem furinhos, com calda de caramelo dourada.', preco: 'R$ 24,00' },
    { nome: 'Cocada de Forno', desc: 'Servida quente com uma bola de sorvete de tapioca.', preco: 'R$ 32,00', badge: 'Chef' },
    { nome: 'Cartola', desc: 'Banana frita, queijo manteiga derretido, açúcar e canela.', preco: 'R$ 28,00' }
  ],
  bebidas: [
    { nome: 'Caipirinha Poti', desc: 'Nossa assinatura: cachaça artesanal, limão cravo, rapadura e capim santo.', preco: 'R$ 28,00', badge: 'Autoral' },
    { nome: 'Chopp Pilsen', desc: 'Caldeta estupidamente gelada, tirada na hora (300ml).', preco: 'R$ 14,00' },
    { nome: 'Gin Tônica Frutas Vermelhas', desc: 'Gin premium, tônica, morango, amora, zimbro e alecrim.', preco: 'R$ 38,00' },
    { nome: 'Cervejas 600ml', desc: 'Original, Serramalte, Heineken ou Stella Artois.', preco: 'R$ 18,00' }
  ],
  naoAlcoolicas: [
    { nome: 'Soda Italiana Caseira', desc: 'Vários sabores de xaropes Monin preparados na hora.', preco: 'R$ 16,00' },
    { nome: 'Sucos Naturais', desc: 'Laranja, limão, abacaxi com hortelã, maracujá.', preco: 'R$ 15,00' },
    { nome: 'Refrigerante Laranja / Guaraná / Cola', desc: 'Lata 350ml.', preco: 'R$ 8,00' }
  ],
  cafes: [
    { nome: 'Expresso Simples', desc: 'Grãos 100% arábica do cerrado mineiro.', preco: 'R$ 7,50' },
    { nome: 'Café Coado Poti', desc: 'Mini coador de pano passado na mesa.', preco: 'R$ 12,00', badge: 'Experiência' }
  ]
};
const MAPS_LINK = "https://maps.app.goo.gl/6hBZKqRo86mJ43Zk6";

const fadeIn = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [formData, setFormData] = useState({
    nome: '',
    tipo: 'Aniversário',
    data: '',
    convidados: '',
    mensagem: ''
  });

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Olá! Vim pelo site e gostaria de orçar um evento.\n\n*Nome:* ${formData.nome}\n*Tipo:* ${formData.tipo}\n*Data:* ${formData.data}\n*Convidados:* ${formData.convidados}\n*Mensagem:* ${formData.mensagem}`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-neutral-50 font-sans selection:bg-brand-green selection:text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-green rounded-full flex items-center justify-center text-white font-bold text-xl">
                P
              </div>
              <span className="text-xl tracking-tight text-brand-green font-serif">Poti <span className="text-amber-700 font-sans font-bold">Bar & Restaurante</span></span>
            </div>
            <div className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-600">
              <a href="#cardapio" className="hover:text-brand-green transition-colors">Cardápio</a>
              <a href="#sobre" className="hover:text-brand-green transition-colors">Sobre</a>
              <a href="#eventos" className="hover:text-brand-green transition-colors">Eventos</a>
              <a href="#localizacao" className="hover:text-brand-green transition-colors">Localização</a>
            </div>
            <a 
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-brand-green text-white text-sm font-medium rounded-full hover:bg-brand-green-dark transition-colors shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Reservar</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-24 lg:pt-32 lg:pb-36 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="max-w-3xl"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-2 py-1 rounded-md bg-neutral-100 text-brand-green text-[10px] uppercase tracking-[0.1em] font-bold mb-4">
              <span>Especialidade da Casa</span>
            </motion.div>
            
            <motion.h1 variants={fadeIn} className="text-4xl md:text-5xl lg:text-6xl tracking-tight text-neutral-900 mb-6 leading-tight">
              Comida brasileira com <br/><span className="italic text-brand-green">tempero e história.</span>
            </motion.h1>
            
            <motion.p variants={fadeIn} className="text-lg md:text-xl text-neutral-600 mb-8 max-w-2xl leading-relaxed">
              Pensado para toda a família. O nosso cardápio é uma celebração das raízes brasileiras, servido com a qualidade e o carinho que você merece.
            </motion.p>
            
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4">
              <a 
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-green text-white font-medium rounded-full hover:bg-brand-green-dark transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                <MessageCircle className="w-5 h-5" />
                Fale conosco no WhatsApp
              </a>
              <a 
                href="#cardapio"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-neutral-900 font-medium rounded-full hover:bg-neutral-50 transition-colors border border-neutral-200"
              >
                Ver Cardápio e Serviços
                <ChevronRight className="w-5 h-5 text-neutral-400" />
              </a>
            </motion.div>
            
            <motion.div variants={fadeIn} className="mt-10 flex items-center gap-4 text-sm text-neutral-500">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-brand-green" />
                <span>Espaço Kids</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-brand-green" />
                <span>Pet Friendly</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Abstract Background Elements with Animation */}
        <motion.div 
          animate={{ rotate: 360, scale: [1, 1.05, 1] }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-brand-green/5 rounded-full blur-3xl -z-10" 
        />
        <motion.div 
          animate={{ x: [0, 20, 0], y: [0, 30, 0], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-40 -left-20 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-3xl -z-10" 
        />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-green/5 -skew-x-12 transform origin-top-right translate-x-10 -z-20 rounded-bl-[100px]" />
      </section>

      {/* About Section */}
      <section id="sobre" className="py-20 bg-white border-y border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="text-3xl font-bold text-neutral-900 mb-6">Tradição que você sente no paladar.</h2>
              <div className="space-y-4 text-lg text-neutral-600 leading-relaxed">
                <p>
                  Bem-vindo ao Poti Bar & Restaurante. Nosso cardápio é uma verdadeira celebração das raízes brasileiras.
                </p>
                <p>
                  A <strong>Carne de Sol com Baião de Dois</strong> e a <strong>Feijoada</strong> (servida tradicionalmente às quartas e sábados) são as grandes estrelas da nossa casa. 
                </p>
                <p>
                  Os pratos são bem servidos e levam aquele tempero caseiro que remete ao conforto, com ingredientes selecionados e técnicas que respeitam a tradição regional. Aqui, cada refeição é pensada para criar memórias com amigos e família.
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="bg-neutral-50 p-8 rounded-3xl border border-neutral-100 relative"
            >
              <motion.div 
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-8 right-8 text-brand-green/20"
              >
                <Heart className="w-24 h-24" />
              </motion.div>
              <h3 className="text-xl font-bold text-neutral-900 mb-6 relative z-10">Por que nos escolher?</h3>
              <ul className="space-y-5 relative z-10">
                {[
                  { title: "Tempero Caseiro Autêntico", desc: "Receitas que respeitam ingredientes e tradições regionais." },
                  { title: "Ambiente Familiar Completo", desc: "Espaço Kids seguro e área totalmente Pet Friendly." },
                  { title: "Atendimento Acolhedor", desc: "Nossa equipe trabalha para que você se sinta em casa." }
                ].map((item, i) => (
                  <motion.li 
                    key={i} 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2 }}
                    className="flex gap-4 group"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-green/10 flex items-center justify-center text-brand-green group-hover:scale-110 group-hover:bg-brand-green group-hover:text-white transition-all">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-900 group-hover:text-brand-green transition-colors">{item.title}</h4>
                      <p className="text-neutral-600 text-sm mt-1">{item.desc}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Menu / Full Cardápio */}
      <section id="cardapio" className="py-24 bg-neutral-50 relative">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl text-neutral-900 mb-4 font-serif">Nosso Cardápio</h2>
            <p className="text-lg text-neutral-600 font-sans">
              Sabores autênticos com o tempero da nossa casa.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Pratos e Executivos */}
            <div>
              <div className="mb-12">
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="flex items-center gap-3 mb-8 pb-4 border-b border-neutral-200"
                >
                  <Utensils className="w-6 h-6 text-brand-green" />
                  <h3 className="text-2xl text-neutral-900 font-serif">Entradas</h3>
                </motion.div>
                <div className="space-y-8">
                  {MENU.entradas.map((item, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
                      whileHover={{ scale: 1.015, x: 4, backgroundColor: 'rgba(0,0,0,0.02)' }}
                      className="group p-4 -mx-4 rounded-2xl transition-all cursor-default"
                    >
                      <div className="flex justify-between items-baseline gap-4 mb-2">
                        <h4 className="text-lg font-bold text-neutral-900 group-hover:text-brand-green transition-colors flex items-center gap-3 font-sans">
                          {item.nome}
                          {item.badge && (
                            <motion.span 
                              initial={{ scale: 0.9 }} 
                              animate={{ scale: [0.9, 1.05, 0.9] }} 
                              transition={{ duration: 2, repeat: Infinity }} 
                              className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-sm bg-brand-green/10 text-brand-green font-sans inline-block"
                            >
                              {item.badge}
                            </motion.span>
                          )}
                        </h4>
                        <div className="flex-grow border-b border-dotted border-neutral-300 relative top-[-6px] hidden sm:block delay-75 group-hover:border-brand-green/50 transition-colors"></div>
                        <span className="text-lg font-bold text-neutral-900 whitespace-nowrap font-sans group-hover:-translate-y-0.5 transition-transform">{item.preco}</span>
                      </div>
                      <p className="text-sm text-neutral-600 font-sans leading-relaxed">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="mb-12">
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="flex items-center gap-3 mb-8 pb-4 border-b border-neutral-200"
                >
                  <Utensils className="w-6 h-6 text-brand-green" />
                  <h3 className="text-2xl text-neutral-900 font-serif">Principais</h3>
                </motion.div>
                <div className="space-y-8">
                  {MENU.principais.map((item, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
                      whileHover={{ scale: 1.015, x: 4, backgroundColor: 'rgba(0,0,0,0.02)' }}
                      className="group p-4 -mx-4 rounded-2xl transition-all cursor-default"
                    >
                      <div className="flex justify-between items-baseline gap-4 mb-2">
                        <h4 className="text-lg font-bold text-neutral-900 group-hover:text-brand-green transition-colors flex items-center gap-3 font-sans">
                          {item.nome}
                          {item.badge && (
                            <motion.span 
                              initial={{ scale: 0.9 }} 
                              animate={{ scale: [0.9, 1.05, 0.9] }} 
                              transition={{ duration: 2, repeat: Infinity }} 
                              className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-sm bg-brand-green/10 text-brand-green font-sans inline-block"
                            >
                              {item.badge}
                            </motion.span>
                          )}
                        </h4>
                        <div className="flex-grow border-b border-dotted border-neutral-300 relative top-[-6px] hidden sm:block delay-75 group-hover:border-brand-green/50 transition-colors"></div>
                        <span className="text-lg font-bold text-neutral-900 whitespace-nowrap font-sans group-hover:-translate-y-0.5 transition-transform">{item.preco}</span>
                      </div>
                      <p className="text-sm text-neutral-600 font-sans leading-relaxed">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="mb-12">
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="flex items-center gap-3 mb-8 pb-4 border-b border-neutral-200"
                >
                  <Clock className="w-6 h-6 text-brand-green" />
                  <h3 className="text-2xl text-neutral-900 font-serif">Almoço Executivo</h3>
                </motion.div>
                <div className="space-y-8">
                  {MENU.executivos.map((item, i) => (
                     <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
                      whileHover={{ scale: 1.015, x: 4, backgroundColor: 'rgba(0,0,0,0.02)' }}
                      className="group p-4 -mx-4 rounded-2xl transition-all cursor-default"
                    >
                      <div className="flex justify-between items-baseline gap-4 mb-2">
                        <h4 className="text-lg font-bold text-neutral-900 group-hover:text-brand-green transition-colors font-sans">{item.nome}</h4>
                        <div className="flex-grow border-b border-dotted border-neutral-300 relative top-[-6px] hidden sm:block delay-75 group-hover:border-brand-green/50 transition-colors"></div>
                        <span className="text-lg font-bold text-neutral-900 whitespace-nowrap font-sans group-hover:-translate-y-0.5 transition-transform">{item.preco}</span>
                      </div>
                      <p className="text-sm text-neutral-600 font-sans leading-relaxed">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="mb-12">
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="flex items-center gap-3 mb-8 pb-4 border-b border-neutral-200"
                >
                  <Heart className="w-6 h-6 text-brand-green" />
                  <h3 className="text-2xl text-neutral-900 font-serif">Sobremesas</h3>
                </motion.div>
                <div className="space-y-8">
                  {MENU.sobremesas.map((item, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
                      whileHover={{ scale: 1.015, x: 4, backgroundColor: 'rgba(0,0,0,0.02)' }}
                      className="group p-4 -mx-4 rounded-2xl transition-all cursor-default"
                    >
                      <div className="flex justify-between items-baseline gap-4 mb-2">
                        <h4 className="text-lg font-bold text-neutral-900 group-hover:text-brand-green transition-colors flex items-center gap-3 font-sans">
                          {item.nome}
                          {item.badge && (
                            <motion.span 
                              initial={{ scale: 0.9 }} 
                              animate={{ scale: [0.9, 1.05, 0.9] }} 
                              transition={{ duration: 2, repeat: Infinity }} 
                              className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-sm bg-brand-green/10 text-brand-green font-sans inline-block"
                            >
                              {item.badge}
                            </motion.span>
                          )}
                        </h4>
                        <div className="flex-grow border-b border-dotted border-neutral-300 relative top-[-6px] hidden sm:block delay-75 group-hover:border-brand-green/50 transition-colors"></div>
                        <span className="text-lg font-bold text-neutral-900 whitespace-nowrap font-sans group-hover:-translate-y-0.5 transition-transform">{item.preco}</span>
                      </div>
                      <p className="text-sm text-neutral-600 font-sans leading-relaxed">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bebidas */}
            <div>
               <div className="mb-12">
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="flex items-center gap-3 mb-8 pb-4 border-b border-neutral-200"
                >
                  <GlassWater className="w-6 h-6 text-brand-green" />
                  <h3 className="text-2xl text-neutral-900 font-serif">Drinks e Cervejas</h3>
                </motion.div>
                <div className="space-y-8">
                  {MENU.bebidas.map((item, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
                      whileHover={{ scale: 1.015, x: 4, backgroundColor: 'rgba(0,0,0,0.02)' }}
                      className="group p-4 -mx-4 rounded-2xl transition-all cursor-default"
                    >
                      <div className="flex justify-between items-baseline gap-4 mb-2">
                        <h4 className="text-lg font-bold text-neutral-900 group-hover:text-brand-green transition-colors flex items-center gap-3 font-sans">
                          {item.nome}
                          {item.badge && (
                            <motion.span 
                              initial={{ scale: 0.9 }} 
                              animate={{ scale: [0.9, 1.05, 0.9] }} 
                              transition={{ duration: 2, repeat: Infinity }} 
                              className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-sm bg-brand-green/10 text-brand-green font-sans inline-block"
                            >
                              {item.badge}
                            </motion.span>
                          )}
                        </h4>
                        <div className="flex-grow border-b border-dotted border-neutral-300 relative top-[-6px] hidden sm:block delay-75 group-hover:border-brand-green/50 transition-colors"></div>
                        <span className="text-lg font-bold text-neutral-900 whitespace-nowrap font-sans group-hover:-translate-y-0.5 transition-transform">{item.preco}</span>
                      </div>
                      <p className="text-sm text-neutral-600 font-sans leading-relaxed">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

               <div className="mb-12">
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="flex items-center gap-3 mb-8 pb-4 border-b border-neutral-200"
                >
                  <GlassWater className="w-6 h-6 text-brand-green" />
                  <h3 className="text-2xl text-neutral-900 font-serif">Não Alcoólicas</h3>
                </motion.div>
                <div className="space-y-8">
                  {MENU.naoAlcoolicas.map((item, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
                      whileHover={{ scale: 1.015, x: 4, backgroundColor: 'rgba(0,0,0,0.02)' }}
                      className="group p-4 -mx-4 rounded-2xl transition-all cursor-default"
                    >
                      <div className="flex justify-between items-baseline gap-4 mb-2">
                        <h4 className="text-lg font-bold text-neutral-900 group-hover:text-brand-green transition-colors flex items-center gap-3 font-sans">
                          {item.nome}
                          {item.badge && (
                            <motion.span 
                              initial={{ scale: 0.9 }} 
                              animate={{ scale: [0.9, 1.05, 0.9] }} 
                              transition={{ duration: 2, repeat: Infinity }} 
                              className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-sm bg-brand-green/10 text-brand-green font-sans inline-block"
                            >
                              {item.badge}
                            </motion.span>
                          )}
                        </h4>
                        <div className="flex-grow border-b border-dotted border-neutral-300 relative top-[-6px] hidden sm:block delay-75 group-hover:border-brand-green/50 transition-colors"></div>
                        <span className="text-lg font-bold text-neutral-900 whitespace-nowrap font-sans group-hover:-translate-y-0.5 transition-transform">{item.preco}</span>
                      </div>
                      <p className="text-sm text-neutral-600 font-sans leading-relaxed">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

               <div className="mb-12">
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="flex items-center gap-3 mb-8 pb-4 border-b border-neutral-200"
                >
                  <svg className="w-6 h-6 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <h3 className="text-2xl text-neutral-900 font-serif">Cafés</h3>
                </motion.div>
                <div className="space-y-8">
                  {MENU.cafes.map((item, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
                      whileHover={{ scale: 1.015, x: 4, backgroundColor: 'rgba(0,0,0,0.02)' }}
                      className="group p-4 -mx-4 rounded-2xl transition-all cursor-default"
                    >
                      <div className="flex justify-between items-baseline gap-4 mb-2">
                        <h4 className="text-lg font-bold text-neutral-900 group-hover:text-brand-green transition-colors flex items-center gap-3 font-sans">
                          {item.nome}
                          {item.badge && (
                            <motion.span 
                              initial={{ scale: 0.9 }} 
                              animate={{ scale: [0.9, 1.05, 0.9] }} 
                              transition={{ duration: 2, repeat: Infinity }} 
                              className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-sm bg-brand-green/10 text-brand-green font-sans inline-block"
                            >
                              {item.badge}
                            </motion.span>
                          )}
                        </h4>
                        <div className="flex-grow border-b border-dotted border-neutral-300 relative top-[-6px] hidden sm:block delay-75 group-hover:border-brand-green/50 transition-colors"></div>
                        <span className="text-lg font-bold text-neutral-900 whitespace-nowrap font-sans group-hover:-translate-y-0.5 transition-transform">{item.preco}</span>
                      </div>
                      <p className="text-sm text-neutral-600 font-sans leading-relaxed">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Família e Espaço */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-white p-8 rounded-3xl border border-neutral-200 shadow-sm mt-12 relative overflow-hidden group hover:border-brand-green/30 transition-colors"
                >
                 <div className="absolute top-0 right-0 w-48 h-48 bg-brand-green/5 -skew-x-12 transform origin-top-right translate-x-4 -z-10 rounded-bl-[80px] group-hover:bg-brand-green/10 transition-colors" />
                 <h4 className="text-xl text-neutral-900 mb-4 flex items-center gap-2 font-serif group-hover:text-brand-green transition-colors">
                    <Baby className="w-5 h-5 text-brand-green transition-transform group-hover:rotate-12" />
                    Ambiente Familiar
                 </h4>
                 <p className="text-sm text-neutral-600 font-sans mb-6">Traga todos! Nosso espaço foi pensado para o seu conforto e diversão.</p>
                 <ul className="space-y-3 font-sans text-sm">
                   <li className="flex gap-2 items-start"><CheckCircle2 className="w-4 h-4 text-brand-green shrink-0 mt-0.5" /><span className="text-neutral-700"><strong>Espaço Kids:</strong> Brinquedão seguro e animado.</span></li>
                   <li className="flex gap-2 items-start"><CheckCircle2 className="w-4 h-4 text-brand-green shrink-0 mt-0.5" /><span className="text-neutral-700"><strong>Pet Friendly:</strong> Seu amigo 4 patas é bem-vindo.</span></li>
                 </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Events / Booking Section */}
      <section id="eventos" className="py-24 bg-white border-y border-neutral-100">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
              
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="inline-flex items-center gap-2 px-2 py-1 rounded-md bg-amber-50 text-amber-700 text-[10px] uppercase tracking-[0.1em] font-bold mb-4 font-sans">
                  <CalendarDays className="w-3 h-3 text-amber-600" />
                  <span>Reserve Nosso Espaço</span>
                </div>
                <h2 className="text-3xl md:text-4xl text-neutral-900 mb-6 font-serif">Celebre seus momentos especiais conosco.</h2>
                <div className="space-y-4 text-lg text-neutral-600 leading-relaxed font-sans mb-8">
                  <p>Organizando um aniversário, casamento civil, confraternização da empresa ou encontrão de família?</p>
                  <p>O <strong>Poti Bar & Restaurante</strong> oferece pacotes sob medida, com menus personalizados, reserva de mesas ou de áreas exclusivas, e todo o suporte da nossa equipe para tornar o seu evento inesquecível.</p>
                </div>
                
                <ul className="space-y-4 font-sans text-neutral-700 mb-8">
                   <li className="flex gap-3 items-center"><div className="w-8 h-8 rounded-full bg-brand-green/10 flex items-center justify-center text-brand-green shrink-0"><CheckCircle2 className="w-4 h-4" /></div> Menus fechados ou comanda individual</li>
                   <li className="flex gap-3 items-center"><div className="w-8 h-8 rounded-full bg-brand-green/10 flex items-center justify-center text-brand-green shrink-0"><CheckCircle2 className="w-4 h-4" /></div> Auxílio na organização</li>
                   <li className="flex gap-3 items-center"><div className="w-8 h-8 rounded-full bg-brand-green/10 flex items-center justify-center text-brand-green shrink-0"><CheckCircle2 className="w-4 h-4" /></div> Acesso livre ao Espaço kids</li>
                </ul>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="bg-neutral-50 p-8 rounded-3xl border border-neutral-200 relative shadow-sm"
              >
                 <h3 className="text-2xl text-neutral-900 mb-6 font-serif">Solicite um Orçamento</h3>
                 <form onSubmit={handleBookingSubmit} className="space-y-5 font-sans">
                    <div>
                      <label htmlFor="nome" className="block text-sm font-semibold text-neutral-700 mb-1.5">Seu Nome</label>
                      <input type="text" id="nome" required value={formData.nome} onChange={e => setFormData({...formData, nome: e.target.value})} className="w-full bg-white border border-neutral-300 rounded-lg px-4 py-3 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-colors" placeholder="Ex: João Silva" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="tipo" className="block text-sm font-semibold text-neutral-700 mb-1.5">Tipo de Evento</label>
                        <select id="tipo" required value={formData.tipo} onChange={e => setFormData({...formData, tipo: e.target.value})} className="w-full bg-white border border-neutral-300 rounded-lg px-4 py-3 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-colors appearance-none">
                          <option>Aniversário</option>
                          <option>Confraternização</option>
                          <option>Casamento / Noivado</option>
                          <option>Outro</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="convidados" className="block text-sm font-semibold text-neutral-700 mb-1.5">Nº Convidados</label>
                        <input type="text" id="convidados" required value={formData.convidados} onChange={e => setFormData({...formData, convidados: e.target.value})} className="w-full bg-white border border-neutral-300 rounded-lg px-4 py-3 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-colors" placeholder="Ex: 20 pessoas" />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="data" className="block text-sm font-semibold text-neutral-700 mb-1.5">Data Prevista</label>
                      <input type="date" id="data" required value={formData.data} onChange={e => setFormData({...formData, data: e.target.value})} className="w-full bg-white border border-neutral-300 rounded-lg px-4 py-3 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-colors" />
                    </div>

                    <div>
                      <label htmlFor="mensagem" className="block text-sm font-semibold text-neutral-700 mb-1.5">Detalhes / Dúvidas</label>
                      <textarea id="mensagem" rows={3} value={formData.mensagem} onChange={e => setFormData({...formData, mensagem: e.target.value})} className="w-full bg-white border border-neutral-300 rounded-lg px-4 py-3 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-colors resize-none" placeholder="Conte mais sobre o que imaginou..."></textarea>
                    </div>

                    <button type="submit" className="w-full bg-brand-green text-white font-bold rounded-lg px-4 py-4 mt-2 hover:bg-brand-green-dark transition-colors flex items-center justify-center gap-2 shadow-sm">
                      <Send className="w-4 h-4" />
                      Enviar Solicitação via WhatsApp
                    </button>
                    <p className="text-center text-xs text-neutral-500 mt-3 flex items-center justify-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-brand-green" /> Retornamos em breve!
                    </p>
                 </form>
              </motion.div>
            </div>
         </div>
      </section>

      {/* Location, Hours, Contact CTA  */}
      <section id="localizacao" className="py-24 bg-white border-t border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-brand-green text-white rounded-3xl p-8 md:p-12 lg:p-16 overflow-hidden relative shadow-xl"
          >
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none" />
            
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 relative z-10">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Venha nos visitar em São Paulo</h2>
                <p className="text-brand-green-light font-medium text-lg mb-8">
                  Aguardamos sua família ou seu grupo de amigos com muita alegria e comida boa.
                </p>

                <div className="space-y-6 mb-10">
                  <motion.div 
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-4 p-4 -ml-4 rounded-xl hover:bg-white/5 transition-colors"
                  >
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <MapPin className="w-6 h-6 shrink-0 text-white mt-1" />
                    </motion.div>
                    <div>
                      <h4 className="font-semibold text-lg">Endereço</h4>
                      <p className="text-emerald-100 mt-1">
                        R. Azevedo Soares, 225<br />
                        Vila Gomes Cardim<br />
                        São Paulo - SP, 03322-000
                      </p>
                      <a 
                        href={MAPS_LINK} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-block mt-2 text-sm font-medium underline underline-offset-4 hover:text-brand-green-light transition-colors"
                      >
                        Como chegar no Google Maps
                      </a>
                    </div>
                  </motion.div>

                  <motion.div 
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-4 p-4 -ml-4 rounded-xl hover:bg-white/5 transition-colors"
                  >
                    <motion.div
                      animate={{ rotate: [0, -10, 10, -10, 0] }}
                      transition={{ duration: 0.5, repeatDelay: 3, repeat: Infinity }}
                    >
                      <Phone className="w-6 h-6 shrink-0 text-white mt-1" />
                    </motion.div>
                    <div>
                      <h4 className="font-semibold text-lg">Contato</h4>
                      <p className="text-emerald-100 mt-1">
                        Ligue ou chame no WhatsApp:
                      </p>
                      <a 
                        href={WHATSAPP_LINK}
                        className="text-xl font-bold hover:text-brand-green-light transition-colors inline-block mt-1"
                      >
                        (11) 97197-8640
                      </a>
                    </div>
                  </motion.div>
                </div>

                <motion.a 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-brand-green font-bold rounded-full hover:bg-neutral-100 transition-all w-full sm:w-auto text-lg shadow-md hover:shadow-lg"
                >
                  <MessageCircle className="w-6 h-6" />
                  Reservar pelo WhatsApp
                </motion.a>
              </div>

              <div>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="bg-brand-green-dark p-8 rounded-2xl border border-white/10"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <Clock className="w-6 h-6 text-brand-green-light" />
                    <h3 className="text-xl font-bold">Horário de Funcionamento</h3>
                  </div>
                  
                  <ul className="space-y-4 text-emerald-50">
                    <li className="flex justify-between items-center border-b border-white/10 pb-3">
                      <span>Segunda-feira</span>
                      <span className="font-medium">12:00 – 17:00</span>
                    </li>
                    <li className="flex justify-between items-center border-b border-white/10 pb-3">
                      <span>Terça-feira</span>
                      <span className="font-medium">12:00 – 17:00</span>
                    </li>
                    <li className="flex justify-between items-center border-b border-white/10 pb-3">
                      <span>Quarta-feira</span>
                      <span className="font-medium">12:00 – 23:00</span>
                    </li>
                    <li className="flex justify-between items-center border-b border-white/10 pb-3">
                      <span>Quinta-feira</span>
                      <span className="font-medium">12:00 – 23:00</span>
                    </li>
                    <li className="flex justify-between items-center border-b border-white/10 pb-3">
                      <span>Sexta-feira</span>
                      <span className="font-medium">12:00 – 23:00</span>
                    </li>
                    <li className="flex justify-between items-center border-b border-white/10 pb-3">
                      <span>Sábado</span>
                      <span className="font-medium">12:00 – 23:00</span>
                    </li>
                    <li className="flex justify-between items-center pt-1">
                      <span>Domingo</span>
                      <span className="font-medium">12:00 – 17:00</span>
                    </li>
                  </ul>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-900 text-neutral-400 py-12 border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 text-white"
            >
              <div className="w-8 h-8 bg-brand-green rounded-full flex items-center justify-center font-bold text-xl font-serif">
                P
              </div>
              <span className="text-xl tracking-tight font-serif">Poti <span className="text-amber-500 font-sans font-bold">Bar & Restaurante</span></span>
            </motion.div>
            
            <div className="flex gap-8 text-sm">
              <motion.a 
                whileHover={{ y: -2, color: "white" }}
                transition={{ type: "spring", stiffness: 300 }}
                href={MAPS_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"
                >
                Como Chegar
              </motion.a>
              <motion.a 
                whileHover={{ y: -2, color: "white" }}
                transition={{ type: "spring", stiffness: 300 }}
                href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"
                >
                WhatsApp
              </motion.a>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-neutral-800 text-sm text-center md:text-left flex flex-col md:flex-row justify-between gap-4">
            <p>© {new Date().getFullYear()} Poti Bar & Restaurante. Todos os direitos reservados.</p>
            <p>Vila Gomes Cardim, São Paulo - SP</p>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-brand-green text-white shadow-lg shadow-brand-green/20 hover:bg-brand-green-dark transition-colors border border-brand-green-light/20"
            aria-label="Voltar ao topo"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
