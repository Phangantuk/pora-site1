// ─── Supported languages ──────────────────────────────────────────────────────
export const SUPPORTED_LANGS = ['en', 'ru', 'es'] as const
export type Lang = typeof SUPPORTED_LANGS[number]

export function isValidLang(lang: string): lang is Lang {
  return SUPPORTED_LANGS.includes(lang as Lang)
}

// ─── Translation shape ────────────────────────────────────────────────────────
export interface Translations {
  lang:     Lang
  dir:      'ltr' | 'rtl'

  // ── Nav ──────────────────────────────────────────────────────────────────
  nav: {
    protocol:      string
    useCases:      string
    proofOfMeal:   string
    network:       string
    transparency:  string
    futureModules: string
    developers:    string
    about:         string
    docs:          string
    enterPortal:   string
  }

  // ── Common ───────────────────────────────────────────────────────────────
  common: {
    live:           string
    planned:        string
    research:       string
    learnMore:      string
    viewAll:        string
    openPortal:     string
    exploreProtocol:string
    readDocs:       string
    viewProtocol:   string
    backHome:       string
    comingSoon:     string
    verified:       string
    verifiedShort:  string
    development:    string
  }

  // ── Home page ─────────────────────────────────────────────────────────────
  home: {
    eyebrow:         string
    heroTitle:       string
    heroTitleAccent: string
    heroSub:         string
    flowStep1:       string
    flowStep2:       string
    flowStep3:       string
    ctaExplore:      string
    ctaPortal:       string
    scroll:          string
    howTag:          string
    howTitle:        string
    howSub:          string
    howCta:          string
    step1Title:      string
    step1Desc:       string
    step2Title:      string
    step2Desc:       string
    step3Title:      string
    step3Desc:       string
    statsTag:        string
    statsTitle:      string
    statsLive:       string
    statVerified:    string
    statMeals:       string
    statCountries:   string
    statValidators:  string
    statsFootnote:   string
    statsLink:       string
    globalTag:       string
    globalTitle:     string
    globalSub:       string
    mapLabel:        string
    mapSub:          string
    porTag:          string
    porTitle:        string
    porSub:          string
    porPoint1:       string
    porPoint2:       string
    porPoint3:       string
    dashTag:         string
    dashTitle:       string
    dashAllActive:   string
    dashViewFull:    string
    dashFeedTitle:   string
    dashFeedSub:     string
    dashFeedLive:    string
    dashMapTitle:    string
    dashMapSub:      string
    dashHealthTitle: string
    dashHealthSub:   string
    healthNetwork:   string
    healthValidators:string
    healthQueue:     string
    healthBlock:     string
    healthApi:       string
    healthOk:        string
    healthPending:   string
    healthNominal:   string
    healthActive:    string
    healthOnline:    string
    sparkLabel:      string
    portalTag:       string
    portalTitle:     string
    portalSub:       string
    roleParticipant: string
    roleValidator:   string
    roleOrg:         string
    roleObserver:    string
  }

  // ── Future modules page ───────────────────────────────────────────────────
  future: {
    metaTitle:        string
    metaDesc:         string
    breadcrumbHome:   string
    eyebrow:          string
    pageTitle:        string
    pageSub:          string
    buildTag:         string
    buildTitle:       string
    buildSub:         string
    buildCtaDocs:     string
    buildCtaProtocol: string
    devLabel:         string
    modules: {
      meal:       { title: string; desc: string; detail: string; meta: string[] }
      shelter:    { title: string; desc: string; detail: string; meta: string[] }
      medicine:   { title: string; desc: string; detail: string; meta: string[] }
      education:  { title: string; desc: string; detail: string; meta: string[] }
      water:      { title: string; desc: string; detail: string; meta: string[] }
      protection: { title: string; desc: string; detail: string; meta: string[] }
    }
  }
}

// ═════════════════════════════════════════════════════════════════════════════
// ENGLISH
// ═════════════════════════════════════════════════════════════════════════════
const en: Translations = {
  lang: 'en',
  dir:  'ltr',

  nav: {
    protocol:      'Protocol',
    useCases:      'Use Cases',
    proofOfMeal:   'Proof of Meal',
    network:       'Network',
    transparency:  'Transparency',
    futureModules: 'Future Modules',
    developers:    'Developers',
    about:         'About',
    docs:          'Docs',
    enterPortal:   'Enter Portal →',
  },

  common: {
    live:            'Live',
    planned:         'Planned',
    research:        'Research',
    learnMore:       'Learn More',
    viewAll:         'View all events →',
    openPortal:      'Open Portal',
    exploreProtocol: 'Explore Protocol',
    readDocs:        'Read developer docs',
    viewProtocol:    'View protocol spec',
    backHome:        'Home',
    comingSoon:      'Coming soon',
    verified:        'verified',
    verifiedShort:   '✓ verified',
    development:     'Development',
  },

  home: {
    eyebrow:          'Protocol Live — First Implementation Active',
    heroTitle:        'Proof of',
    heroTitleAccent:  'Real Action',
    heroSub:          'A protocol connecting real-world humanitarian actions with verifiable, permanent digital records.',
    flowStep1:        'Real Action',
    flowStep2:        'Verification',
    flowStep3:        'Protocol Record',
    ctaExplore:       'Explore Protocol',
    ctaPortal:        'Enter Portal',
    scroll:           'Scroll',
    howTag:           'How it works',
    howTitle:         'From action to permanent record',
    howSub:           'PORA is infrastructure for turning real-world humanitarian events into verifiable, tamper-proof digital records. Any action. Any organization. Anywhere.',
    howCta:           'Read the protocol spec',
    step1Title:       'Real Action Occurs',
    step1Desc:        'A participant performs a verifiable humanitarian action — meals distributed, shelter provided, medical assistance given.',
    step2Title:       'Validators Confirm',
    step2Desc:        'Independent validators review submitted evidence against protocol standards before the record proceeds.',
    step3Title:       'Permanent Record',
    step3Desc:        'The verified event is written to the PORA record layer — public, immutable, and queryable by anyone.',
    statsTag:         'Network Stats',
    statsTitle:       'Protocol activity, live and open',
    statsLive:        'Updating live',
    statVerified:     'Verified Actions',
    statMeals:        'Meals Verified',
    statCountries:    'Countries',
    statValidators:   'Validators',
    statsFootnote:    'All data is publicly verifiable via the PORA protocol API.',
    statsLink:        'View full transparency ledger →',
    globalTag:        'Global Network',
    globalTitle:      'Global Network of Real Actions',
    globalSub:        'Verified actions are recorded with location data, building a transparent global ledger of humanitarian impact.',
    mapLabel:         'Interactive global map — coming soon',
    mapSub:           'Verified actions will appear here in real time',
    porTag:           'First Implementation',
    porTitle:         'Proof of Meal',
    porSub:           'A system that verifies real-world feeding events and records them as permanent protocol actions. From local community kitchens to large-scale aid operations — every meal counts.',
    porPoint1:        'Submit a feeding event with photographic evidence',
    porPoint2:        'Validators confirm the event meets protocol standards',
    porPoint3:        'Event becomes a permanent, public protocol record',
    dashTag:          'Protocol Activity',
    dashTitle:        'Live dashboard',
    dashAllActive:    'All systems active',
    dashViewFull:     'View full →',
    dashFeedTitle:    'Recent Actions',
    dashFeedSub:      'Last verified protocol events',
    dashFeedLive:     'Live',
    dashMapTitle:     'Global Action Map',
    dashMapSub:       'Verified action locations',
    dashHealthTitle:  'Protocol Health',
    dashHealthSub:    'Real-time system status',
    healthNetwork:    'Network Status',
    healthValidators: 'Validators Online',
    healthQueue:      'Verification Queue',
    healthBlock:      'Last Block',
    healthApi:        'API',
    healthOk:         'Active',
    healthPending:    '12 pending',
    healthNominal:    'Nominal',
    healthActive:     'Active',
    healthOnline:     '54 / 54',
    sparkLabel:       'Verifications / 12h',
    portalTag:        'Portal Access',
    portalTitle:      'Enter the PORA Portal',
    portalSub:        'Connect your wallet, submit verified actions, validate events, or simply explore the global record. Participation is open to everyone.',
    roleParticipant:  'Participant',
    roleValidator:    'Validator',
    roleOrg:          'Organization',
    roleObserver:     'Observer',
  },

  future: {
    metaTitle:        'Future Modules',
    metaDesc:         'Real-world actions that can be verified and recorded using the PORA protocol.',
    breadcrumbHome:   'Home',
    eyebrow:          'Protocol roadmap',
    pageTitle:        'Future PORA Modules',
    pageSub:          'Real-world actions that can be verified and recorded using the PORA protocol. The core infrastructure is shared — only the action type changes.',
    buildTag:         'Open protocol',
    buildTitle:       'Build a Proof-of-X module',
    buildSub:         'Any verifiable humanitarian action can become a PORA module. The protocol provides the verification and record layer — you define the action standards.',
    buildCtaDocs:     'Read developer docs',
    buildCtaProtocol: 'View protocol spec',
    devLabel:         'Development',
    modules: {
      meal:       { title: 'Proof of Meal',       desc: 'Verify meals served to people in need and record feeding events transparently.',           detail: 'The first production implementation of the PORA protocol — operational and live.',                                           meta: ['28 countries','840K+ meals','140 orgs'] },
      shelter:    { title: 'Proof of Shelter',    desc: 'Confirm temporary or long-term shelter provided to displaced individuals.',                  detail: 'Designed for emergency housing providers, displacement response teams, and long-term housing NGOs.',                        meta: ['Est. Q3 2025','Spec drafted'] },
      medicine:   { title: 'Proof of Medicine',   desc: 'Track medicine distribution and healthcare support actions on-chain.',                      detail: 'Applicable to mobile health units, field clinics, and medicine aid programmes.',                                            meta: ['Est. Q4 2025','Spec in review'] },
      education:  { title: 'Proof of Education',  desc: 'Record educational sessions, training programs, and learning events.',                      detail: 'Exploring verification frameworks for community schools and vocational training.',                                         meta: ['Early research','RFC open'] },
      water:      { title: 'Proof of Water',      desc: 'Verify clean water distribution and sanitation efforts in underserved areas.',              detail: 'Defining standards for water delivery verification in humanitarian contexts.',                                             meta: ['Early research'] },
      protection: { title: 'Proof of Protection', desc: 'Document protection services and legal aid provided to vulnerable populations.',            detail: 'Early-stage exploration for legal aid organisations and monitoring programmes.',                                           meta: ['Conceptual'] },
    },
  },
}

// ═════════════════════════════════════════════════════════════════════════════
// RUSSIAN
// ═════════════════════════════════════════════════════════════════════════════
const ru: Translations = {
  lang: 'ru',
  dir:  'ltr',

  nav: {
    protocol:      'Протокол',
    useCases:      'Применения',
    proofOfMeal:   'Подтверждение питания',
    network:       'Сеть',
    transparency:  'Прозрачность',
    futureModules: 'Будущие модули',
    developers:    'Разработчикам',
    about:         'О проекте',
    docs:          'Документация',
    enterPortal:   'Войти в портал →',
  },

  common: {
    live:            'Активен',
    planned:         'Планируется',
    research:        'Исследование',
    learnMore:       'Узнать больше',
    viewAll:         'Все события →',
    openPortal:      'Открыть портал',
    exploreProtocol: 'Изучить протокол',
    readDocs:        'Документация для разработчиков',
    viewProtocol:    'Спецификация протокола',
    backHome:        'Главная',
    comingSoon:      'Скоро',
    verified:        'подтверждено',
    verifiedShort:   '✓ подтверждено',
    development:     'Разработка',
  },

  home: {
    eyebrow:          'Протокол активен — первая реализация запущена',
    heroTitle:        'Доказательство',
    heroTitleAccent:  'Реального Действия',
    heroSub:          'Протокол, связывающий реальные гуманитарные действия с верифицируемыми постоянными цифровыми записями.',
    flowStep1:        'Реальное действие',
    flowStep2:        'Верификация',
    flowStep3:        'Запись в протокол',
    ctaExplore:       'Изучить протокол',
    ctaPortal:        'Войти в портал',
    scroll:           'Прокрутить',
    howTag:           'Как это работает',
    howTitle:         'От действия к постоянной записи',
    howSub:           'PORA — инфраструктура для превращения реальных гуманитарных событий в верифицируемые цифровые записи. Любое действие. Любая организация. Где угодно.',
    howCta:           'Спецификация протокола',
    step1Title:       'Происходит реальное действие',
    step1Desc:        'Участник выполняет верифицируемое гуманитарное действие — раздача еды, предоставление жилья, медицинская помощь.',
    step2Title:       'Валидаторы подтверждают',
    step2Desc:        'Независимые валидаторы проверяют представленные доказательства в соответствии со стандартами протокола.',
    step3Title:       'Постоянная запись',
    step3Desc:        'Верифицированное событие записывается в слой записей PORA — публично, неизменно и доступно для запросов.',
    statsTag:         'Статистика сети',
    statsTitle:       'Активность протокола — открыто и в реальном времени',
    statsLive:        'Обновляется в реальном времени',
    statVerified:     'Верифицированных действий',
    statMeals:        'Подтверждённых приёмов пищи',
    statCountries:    'Стран',
    statValidators:   'Валидаторов',
    statsFootnote:    'Все данные публично верифицируемы через API протокола PORA.',
    statsLink:        'Полный журнал прозрачности →',
    globalTag:        'Глобальная сеть',
    globalTitle:      'Глобальная сеть реальных действий',
    globalSub:        'Верифицированные действия записываются с данными о местоположении, создавая прозрачный глобальный реестр гуманитарного воздействия.',
    mapLabel:         'Интерактивная карта — скоро',
    mapSub:           'Верифицированные действия появятся здесь в реальном времени',
    porTag:           'Первая реализация',
    porTitle:         'Подтверждение питания',
    porSub:           'Система верификации реальных событий кормления и их записи как постоянных действий протокола. От местных столовых до крупных гуманитарных операций.',
    porPoint1:        'Отправить событие кормления с фотодоказательствами',
    porPoint2:        'Валидаторы подтверждают соответствие стандартам протокола',
    porPoint3:        'Событие становится постоянной публичной записью протокола',
    dashTag:          'Активность протокола',
    dashTitle:        'Панель в реальном времени',
    dashAllActive:    'Все системы активны',
    dashViewFull:     'Смотреть всё →',
    dashFeedTitle:    'Последние действия',
    dashFeedSub:      'Последние верифицированные события протокола',
    dashFeedLive:     'Онлайн',
    dashMapTitle:     'Карта действий',
    dashMapSub:       'Местоположения верифицированных действий',
    dashHealthTitle:  'Состояние протокола',
    dashHealthSub:    'Статус системы в реальном времени',
    healthNetwork:    'Статус сети',
    healthValidators: 'Валидаторов онлайн',
    healthQueue:      'Очередь верификации',
    healthBlock:      'Последний блок',
    healthApi:        'API',
    healthOk:         'Активен',
    healthPending:    '12 в очереди',
    healthNominal:    'В норме',
    healthActive:     'Активен',
    healthOnline:     '54 / 54',
    sparkLabel:       'Верификации / 12ч',
    portalTag:        'Доступ к порталу',
    portalTitle:      'Войти в портал PORA',
    portalSub:        'Подключите кошелёк, отправляйте верифицированные действия, проверяйте события или просто исследуйте глобальный реестр.',
    roleParticipant:  'Участник',
    roleValidator:    'Валидатор',
    roleOrg:          'Организация',
    roleObserver:     'Наблюдатель',
  },

  future: {
    metaTitle:        'Будущие модули',
    metaDesc:         'Реальные действия, которые можно верифицировать и записать с помощью протокола PORA.',
    breadcrumbHome:   'Главная',
    eyebrow:          'Дорожная карта протокола',
    pageTitle:        'Будущие модули PORA',
    pageSub:          'Реальные действия, которые можно верифицировать и записать с помощью протокола PORA. Базовая инфраструктура общая — меняется только тип действия.',
    buildTag:         'Открытый протокол',
    buildTitle:       'Создайте модуль Proof-of-X',
    buildSub:         'Любое верифицируемое гуманитарное действие может стать модулем PORA. Протокол предоставляет слой верификации и записи — вы определяете стандарты действий.',
    buildCtaDocs:     'Документация для разработчиков',
    buildCtaProtocol: 'Спецификация протокола',
    devLabel:         'Разработка',
    modules: {
      meal:       { title: 'Подтверждение питания',           desc: 'Верифицируйте приёмы пищи для нуждающихся и прозрачно записывайте события кормления.',   detail: 'Первая производственная реализация протокола PORA — работает и активна.',                                              meta: ['28 стран', '840К+ приёмов пищи', '140 организаций'] },
      shelter:    { title: 'Подтверждение жилья',             desc: 'Подтверждайте временное или долгосрочное жильё для вынужденных переселенцев.',               detail: 'Предназначен для поставщиков экстренного жилья, команд реагирования и НКО.',                                          meta: ['Ожидается Q3 2025', 'Черновик готов'] },
      medicine:   { title: 'Подтверждение медицинской помощи',desc: 'Отслеживайте распределение лекарств и медицинскую поддержку на блокчейне.',                   detail: 'Применимо для мобильных медицинских отрядов, полевых клиник и гуманитарных программ.',                                meta: ['Ожидается Q4 2025', 'Спецификация на проверке'] },
      education:  { title: 'Подтверждение образования',       desc: 'Записывайте образовательные сессии, учебные программы и обучающие события.',                  detail: 'Изучаем системы верификации для общественных школ и профессионального обучения.',                                   meta: ['Ранние исследования', 'RFC открыт'] },
      water:      { title: 'Подтверждение водоснабжения',     desc: 'Верифицируйте распределение чистой воды и санитарные мероприятия в нуждающихся районах.',      detail: 'Определяем стандарты верификации доставки воды в гуманитарных контекстах.',                                          meta: ['Ранние исследования'] },
      protection: { title: 'Подтверждение защиты',            desc: 'Документируйте услуги защиты и юридическую помощь уязвимым слоям населения.',                  detail: 'Ранний этап изучения для правозащитных организаций.',                                                               meta: ['Концептуальная стадия'] },
    },
  },
}

// ═════════════════════════════════════════════════════════════════════════════
// SPANISH
// ═════════════════════════════════════════════════════════════════════════════
const es: Translations = {
  lang: 'es',
  dir:  'ltr',

  nav: {
    protocol:      'Protocolo',
    useCases:      'Casos de uso',
    proofOfMeal:   'Prueba de alimentación',
    network:       'Red',
    transparency:  'Transparencia',
    futureModules: 'Módulos futuros',
    developers:    'Desarrolladores',
    about:         'Acerca de',
    docs:          'Documentación',
    enterPortal:   'Entrar al portal →',
  },

  common: {
    live:            'En vivo',
    planned:         'Planificado',
    research:        'Investigación',
    learnMore:       'Saber más',
    viewAll:         'Ver todos los eventos →',
    openPortal:      'Abrir portal',
    exploreProtocol: 'Explorar protocolo',
    readDocs:        'Documentación para desarrolladores',
    viewProtocol:    'Ver especificación del protocolo',
    backHome:        'Inicio',
    comingSoon:      'Próximamente',
    verified:        'verificado',
    verifiedShort:   '✓ verificado',
    development:     'Desarrollo',
  },

  home: {
    eyebrow:          'Protocolo activo — primera implementación en funcionamiento',
    heroTitle:        'Prueba de',
    heroTitleAccent:  'Acción Real',
    heroSub:          'Un protocolo que conecta acciones humanitarias reales con registros digitales verificables y permanentes.',
    flowStep1:        'Acción real',
    flowStep2:        'Verificación',
    flowStep3:        'Registro de protocolo',
    ctaExplore:       'Explorar protocolo',
    ctaPortal:        'Entrar al portal',
    scroll:           'Desplazar',
    howTag:           'Cómo funciona',
    howTitle:         'De la acción al registro permanente',
    howSub:           'PORA es infraestructura para convertir eventos humanitarios reales en registros digitales verificables e inmutables. Cualquier acción. Cualquier organización. En cualquier lugar.',
    howCta:           'Leer especificación del protocolo',
    step1Title:       'Ocurre una acción real',
    step1Desc:        'Un participante realiza una acción humanitaria verificable — distribución de alimentos, refugio proporcionado, asistencia médica.',
    step2Title:       'Los validadores confirman',
    step2Desc:        'Validadores independientes revisan la evidencia presentada según los estándares del protocolo antes de proceder al registro.',
    step3Title:       'Registro permanente',
    step3Desc:        'El evento verificado se escribe en la capa de registros PORA — pública, inmutable y consultable por cualquiera.',
    statsTag:         'Estadísticas de red',
    statsTitle:       'Actividad del protocolo, en vivo y abierta',
    statsLive:        'Actualizando en vivo',
    statVerified:     'Acciones verificadas',
    statMeals:        'Comidas verificadas',
    statCountries:    'Países',
    statValidators:   'Validadores',
    statsFootnote:    'Todos los datos son verificables públicamente mediante la API del protocolo PORA.',
    statsLink:        'Ver registro completo de transparencia →',
    globalTag:        'Red global',
    globalTitle:      'Red global de acciones reales',
    globalSub:        'Las acciones verificadas se registran con datos de ubicación, creando un libro mayor global transparente del impacto humanitario.',
    mapLabel:         'Mapa global interactivo — próximamente',
    mapSub:           'Las acciones verificadas aparecerán aquí en tiempo real',
    porTag:           'Primera implementación',
    porTitle:         'Prueba de alimentación',
    porSub:           'Un sistema que verifica eventos de alimentación del mundo real y los registra como acciones permanentes del protocolo. Desde cocinas comunitarias locales hasta operaciones de ayuda a gran escala.',
    porPoint1:        'Enviar un evento de alimentación con evidencia fotográfica',
    porPoint2:        'Los validadores confirman que el evento cumple los estándares del protocolo',
    porPoint3:        'El evento se convierte en un registro permanente y público del protocolo',
    dashTag:          'Actividad del protocolo',
    dashTitle:        'Panel en tiempo real',
    dashAllActive:    'Todos los sistemas activos',
    dashViewFull:     'Ver completo →',
    dashFeedTitle:    'Acciones recientes',
    dashFeedSub:      'Últimos eventos verificados del protocolo',
    dashFeedLive:     'En vivo',
    dashMapTitle:     'Mapa de acciones',
    dashMapSub:       'Ubicaciones de acciones verificadas',
    dashHealthTitle:  'Estado del protocolo',
    dashHealthSub:    'Estado del sistema en tiempo real',
    healthNetwork:    'Estado de red',
    healthValidators: 'Validadores en línea',
    healthQueue:      'Cola de verificación',
    healthBlock:      'Último bloque',
    healthApi:        'API',
    healthOk:         'Activo',
    healthPending:    '12 pendientes',
    healthNominal:    'Normal',
    healthActive:     'Activo',
    healthOnline:     '54 / 54',
    sparkLabel:       'Verificaciones / 12h',
    portalTag:        'Acceso al portal',
    portalTitle:      'Entrar al portal PORA',
    portalSub:        'Conecta tu billetera, envía acciones verificadas, valida eventos o simplemente explora el registro global. La participación está abierta a todos.',
    roleParticipant:  'Participante',
    roleValidator:    'Validador',
    roleOrg:          'Organización',
    roleObserver:     'Observador',
  },

  future: {
    metaTitle:        'Módulos futuros',
    metaDesc:         'Acciones del mundo real que pueden verificarse y registrarse con el protocolo PORA.',
    breadcrumbHome:   'Inicio',
    eyebrow:          'Hoja de ruta del protocolo',
    pageTitle:        'Módulos futuros de PORA',
    pageSub:          'Acciones del mundo real que pueden verificarse y registrarse con el protocolo PORA. La infraestructura central es compartida — solo cambia el tipo de acción.',
    buildTag:         'Protocolo abierto',
    buildTitle:       'Construye un módulo Proof-of-X',
    buildSub:         'Cualquier acción humanitaria verificable puede convertirse en un módulo PORA. El protocolo proporciona la capa de verificación y registro — tú defines los estándares de acción.',
    buildCtaDocs:     'Documentación para desarrolladores',
    buildCtaProtocol: 'Ver especificación del protocolo',
    devLabel:         'Desarrollo',
    modules: {
      meal:       { title: 'Prueba de alimentación',  desc: 'Verifica las comidas servidas a personas necesitadas y registra los eventos de alimentación de forma transparente.',  detail: 'La primera implementación de producción del protocolo PORA — operativa y en funcionamiento.',                          meta: ['28 países', '840K+ comidas', '140 organizaciones'] },
      shelter:    { title: 'Prueba de refugio',       desc: 'Confirma el refugio temporal o permanente proporcionado a personas desplazadas.',                                      detail: 'Diseñado para proveedores de vivienda de emergencia, equipos de respuesta al desplazamiento y ONG.',                    meta: ['Est. Q3 2025', 'Borrador listo'] },
      medicine:   { title: 'Prueba de medicina',      desc: 'Rastrea la distribución de medicamentos y las acciones de apoyo sanitario en la cadena.',                             detail: 'Aplicable a unidades de salud móviles, clínicas de campo y programas de ayuda médica.',                                 meta: ['Est. Q4 2025', 'Especificación en revisión'] },
      education:  { title: 'Prueba de educación',     desc: 'Registra sesiones educativas, programas de formación y eventos de aprendizaje.',                                      detail: 'Explorando marcos de verificación para escuelas comunitarias y formación profesional.',                                 meta: ['Investigación inicial', 'RFC abierto'] },
      water:      { title: 'Prueba de agua',          desc: 'Verifica la distribución de agua limpia y los esfuerzos de saneamiento en zonas desatendidas.',                       detail: 'Definiendo estándares para la verificación de entrega de agua en contextos humanitarios.',                              meta: ['Investigación inicial'] },
      protection: { title: 'Prueba de protección',    desc: 'Documenta los servicios de protección y la asistencia jurídica proporcionada a poblaciones vulnerables.',              detail: 'Exploración en etapa temprana para organizaciones de ayuda legal.',                                                    meta: ['Conceptual'] },
    },
  },
}

// ─── Dictionary export ────────────────────────────────────────────────────────
export const dict: Record<Lang, Translations> = { en, ru, es }

export function getT(lang: Lang): Translations {
  return dict[lang] ?? dict.en
}
