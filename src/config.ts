import {EventType} from "@/sections/AboutMe";
import {Project} from "@/sections/Projects";
import {
    Bot,
    BotMessageSquare,
    BriefcaseBusiness, CodeXml,
    Gamepad2,
    GraduationCap,
    Monitor,
    PanelsTopLeft,
    Pickaxe
} from "lucide-react";

export const events: EventType[] = [
    {
        date: "Décembre 2019",
        type: {
            icon: BriefcaseBusiness,
            label: "Experience professionnelle"
        },
        title: "Stage d'observation",
        place: "Level Up Cluster, Tourcoing, France",
        length: "1 semaine",
        description: "Pendant mon année de 3e, j'ai réalisé mon tout **premier stage en entreprise**. Il s'agissait simplement d'un **stage d'observation** pour découvrir le monde professionnel, et pourtant, c'est le domaine de la création web qui m'intéressait et qui **me passionne toujours aujourd'hui**.\nCelui ci n'a duré qu'une semaine mais j'y ai **appris beaucoup de choses**.\nJ'ai pû **découvrir le métier** directement sur terrain ainsi que la **coordination entre les différentes équipes**. J'ai également pu **réaliser une petite application web** en collaboration avec un autre stagiaire plus tourné graphique.",
        img: "https://levelup-cluster.eu/wp-content/uploads/2023/04/groupe-recadre768px.jpg",
        imgSrc: {
            credit: "Illustration provenant de Level Up Cluster",
            origin: "https://levelup-cluster.eu/qui-sommes-nous"
        }
    },
    {
        date: "Septembre 2020",
        type: {
            icon: GraduationCap,
            label: "Formation"
        },
        title: "Baccalauréat Général",
        place: "Lycée Anatole France, Lillers, France",
        length: "3 ans",
        description: "C'est lors de mes années de lycée que j'ai confirmé mon **intérêt pour l'informatique** et la volonté de **poursuivre dans ce domaine**.\nJ'ai décidé de prendre les spécialités **Mathématiques, NSI, ainsi que Culture et Langage étrangère : Anglais**, que j'ai dû laisser en terminale. J'ai également fait les options **Maths Expertes, Euro Anglaise, et Cinéma Audiovisuel**. Toutes ces formations m'ont beaucoup apporté, notamment les matières mathématiques.\nAprès 3 ans, j'ai obtenu mon baccalauréat général avec **mention très bien** mais également avec une **mention européenne**. Par ailleurs, j'ai passé la **certification Cambridge** où je suis monté au **niveau B1**.",
        img: "https://www.62190.fr/wp-content/uploads/2020/06/lycee-anatole-france-lillers.jpg",
        imgSrc: {
            credit: "Illustration provenant de 62190.fr",
            origin: "https://www.62190.fr/lillers-18-des-eleves-ont-retrouve-le-lycee-anatole-france"
        }
    },
    {
        date: "Février 2023",
        type: {
            icon: BriefcaseBusiness,
            label: "Experience professionnelle"
        },
        title: "Projet en Freelance\nRefonte de site",
        length: "5 mois",
        description: "Afin de réaliser un **vrai projet** avec un **vrai client** en utilisant mes connaissances, je me suis lancé dans la **refonte d'un site** géré par un groupe de recherche historique que je connais bien.\nC'était très intéressant car je n'avais pas l'habitude de suivre les **demandes d'un client**, surtout lorsque ceux-ci ne sont pas spécialisés.\nPour voir plus d'informations, vous pouvez consulter la partie \"Mes Projets\" ci-dessous ou [voir directement le résultat final](https://busnes-histoire.fr).",
        img: "https://busnes-histoire.fr/imgs/bg.jpg",
        imgSrc: {
            credit: "Illustration provenant de busnes-histoire.fr",
            origin: "https://busnes-histoire.fr/home"
        }
    },
    {
        date: "Septembre 2023",
        type: {
            icon: GraduationCap,
            label: "Formation"
        },
        title: "Licence informatique",
        place: "Faculté des Sciences Jean Perrin, Lens, France",
        length: "5 ans, depuis 2 ans",
        description: "Après mon Baccalauréat, j'ai décidé de m'orienter vers une **licence informatique**. Je trouve que c'est une formation qui réunit tous mes critères : des **matières diversifiées**; une grande place à l'**autonomie**; un **rythme de travail plutôt important** donnant toutefois du **temps pour les travaux personnels**; et surtout, un **bon cadre d'études**.\nLa première année fût un mélange de **connaissances déjà connu** et de beaucoup de **connaissances nouvelles**.\nEn parallèle des cours, j'ai découvert le monde de la **programmation compétitive**. D'abord juste un moyen de développer mes connaissances, j'ai eu l'occasion de participer à [ARC (Artois pRogramming Contest)](https://informaticiens-artois.fr/arc-2023), une compétition organisé par l'association des informaticiens d'Artois dans le cadre de la faculté. Ayant **fini 2e avec mon équipe**, nous avons continué en participant au [SWERC (Southwestern Europe Regional Contest)](https://swerc.eu) la même année.",
        img: "https://live.staticflickr.com/5313/5879940955_01e367aa9b_b.jpg",
        imgSrc: {
            credit: "Illustration provenant de Flickr",
            origin: "https://flickr.com/photos/bu_arras/5879940955"
        }
    },
    {
        date: "Septembre 2024",
        type: {
            icon: BriefcaseBusiness,
            label: "Experience professionnelle"
        },
        title: "Ouvreur en CD2I",
        place: "Comédie de Béthune, Béthune, France",
        length: "Depuis 1 an",
        description: "En parallèle de mes études, j'ai décroché un **job en CD2I** à la [comédie de Béthune](https://www.comediedebethune.org). Tout commence avec une recherche de travail pour la période Mai - Juillet.\nEn ayant donné mon CV et une lettre de motivation dans plusieurs établissements culturels comme des cinémas, j'ai été contactée au mois de juin pour proposer un **poste d'ouvreur à la comédie de Béthune**.\nCe poste consiste à **accueillir le public, le diriger, le placer, scanner les billets ainsi que d'autres tâches diverses**. Étant en étude sur Lens et en habitant Béthune, celui-ci m'intéressait beaucoup.\nJ'ai donc **passé un entretien fin Juin** pour un **début en septembre**, le contrat durant 1 an.\nDepuis, je me suis **bien intégré**. Celà m'est particulièrement utile car je suis quelqu'un de plutôt **introverti** et cette opportunité me permet de **me surpasser** et de **sortir de ma zone de confort**.",
        img: "https://images.adsttc.com/media/images/54e5/1668/e58e/cec9/5100/005d/slideshow/PALACE--003.jpg",
        imgSrc: {
            credit: "Illustration provenant de ArchDaily",
            origin: "https://www.archdaily.com/600172/comedie-de-bethune-national-drama-theater-manuelle-gautrand-architecture"
        }
    }
];

export const projects: Project[] = [
    {
        title: "Connect 4 Together",
        subtitle: "Jeu multijoueurs en ligne",
        Icon: Gamepad2,
        thumbnail: "/imgs/c4t.gif",
        code: "https://github.com/baptiste-may/connect-4-together",
        url: "https://connect-4-together.may-baptiste.fr",
        date: "Janvier 2025",
        duration: "3 mois",
        job: "Développeur Fullstack",
        teamSize: "Solo",
        tools: [
            "TypeScript",
            "NextJS",
            "Colyseus",
            "DaisyUI"
        ],
        details: "Le début de ce projet commence avec une envie de réaliser un **vrai projet en NextJS**. J'avais comme idée un puissance 4 pouvant être jouer à plus de 2 joueurs.\nJ'ai toujours voulu donner la possibilité à n'importe qui de pouvoir **jouer facilement et rapidement**. Ains, je me suis mis à chercher un outils me permettant de créer ce jeu multi-joueur en réduisant au maximum les contraintes techniques.\nMon choix s'est donc porté sur [Colyseus](https://colyseus.io). C'est un **framework open-source** permettant de gérer **facilement et avec beaucoup de flexibilité** des rooms pour du jeu multi-joueurs.\nN'étant pas un profesionnel dans le design, j'ai obté pour un **framework de style** nommé [DaisyUI](https://daisyui.com). Celle-ci propose une large variété de thèmes et de composants tout en gardant un **esprit enfantin**.\n![Écran d'acceuil du jeu](/imgs/c4t-home.webp)\nLa plus **grande difficulté** sur ce projet fût de mettre en place le **système de room et d'états**. Bien que le client de Colyseus s'intégre parfaitement à React, la partie backend avec toute la logique du jeu doit être **réalisé à la main**."
    },
    {
        title: "GRHB",
        subtitle: "Refonte de site web",
        Icon: PanelsTopLeft,
        thumbnail: "https://busnes-histoire.fr/imgs/bg.jpg",
        code: "https://github.com/baptiste-may/GRHB",
        url: "https://busnes-histoire.fr",
        date: "Février 2023",
        duration: "5 mois",
        job: "Développeur Fullstack",
        teamSize: "Solo",
        tools: [
            "JavaScript",
            "JQuery",
            "NodeJS",
            "Express"
        ],
        details: "Le but de ce projet été d'**utiliser en pratique mes connaissances** apprises au fur et à mesure des années. Pour ce faire, je me suis lancé le défi de **recréer, de manière plus moderne et dynamique**, le site web d'un groupe de recherches historiques que je connais bien.\n![Page d'acceuil](/imgs/grhb.webp)\nUtilisant les technologies à ma connaissance, cette réalisation fût une **véritable preuve** de mon domaine de prédilection. J'ai même été **rémunéré** pour le travail produit. Par ailleurs, je suis toujours en contact avec la gérante pour tout **modification ou amélioration** potentielle.\nCependant, la tâche n'était **pas la plus simple**. En utilisant du **JavaScript classique**, même aidé avec [JQuery](https://jquery.com), j'ai eu beaucoup de mal sur les **pages dynamique** du site. D'autant plus que j'utilisais un nouvel outils que je n'avais jamais eu l'occasion d'utiliser : [Express](https://expressjs.com)."
    },
    {
        title: "NostoMC",
        subtitle: "Développement Java pour Minecraft",
        Icon: Pickaxe,
        thumbnail: "/imgs/nostomc.gif",
        code: "https://github.com/nostoMC/plugins",
        date: "Juillet 2021",
        duration: "1 an",
        job: "Chef de projet, dev Java",
        teamSize: "Duo de dev + duo de com",
        tools: [
            "Java",
            "Git",
            "Gradle",
            "Intellij"
        ],
        details: "Ce projet débuta pendant la **période du COVID**. En plus du temps libre disponible, j'en ai profité pour lancé un projet de **serveur Minecraft original**. Parmis les idées du projet, il y avait une boîte de nuit disponible à tous.\n![Entrée de la boîte](/imgs/nostomc-enter.webp)\nÉtant fan **de créations lumineuses (lightshow) et de show en général**, je me suis intéréssé principalement à la réalisation des effets : fumée, strobe, et surtout, **faisseaux lumineux**.\n![Effets avec contrôles](/imgs/nostomc-controls.webp)\nCeux-ci ont d'ailleurs été les plus compliqués à mettre en place. J'ai dû notamment développer mes **connaissances en trigonométrie** puisque je voulais un système relativement réaliste avec le **pan** et le **tilt** de chaque lampe.\n![Exemple des faisseaux](/imgs/nostomc-lights-beam.gif)\n![Exemple de lumières](/imgs/nostomc-lights-top.gif)"
    },
    {
        title: "Schtroumpfdle",
        subtitle: "Jeu en ligne",
        Icon: Gamepad2,
        thumbnail: "/imgs/schtroumpfdle.gif",
        code: "https://github.com/baptiste-may/schtroumpfdle",
        url: "https://schtroumpfdle.may-baptiste.fr",
        date: "Janvier 2024",
        duration: "2 mois",
        job: "Développeur Fullstack",
        teamSize: "Solo",
        tools: [
            "TypeScript",
            "NextJS",
            "Prisma",
            "SemanticUI"
        ],
        details: "La réalisation de ce projet vient d'une simple idée proposé par un de mes amis : Faire un jeu dans le style [LoLdle](https://loldle.net) mais dans le domaine des **Schtroumpfs**.\nJ'ai profité de cette idée pour **utiliser mes compétences** et une librarie de style que je connaissais pas : [SemanticUI](https://semantic-ui.com).\n![Exemple de partie](/imgs/schtroumpfdle-exemple.webp)\nLa première version du jeu était réalisé en **JavaScript classique + JQuery**. Après mon apprentissage de React et de NextJS, j'ai mis à jour cette version en **NextJS** avec notamment la [version React de SemanticUI](https://react.semantic-ui.com).\nLe plus dur dans cette transformation fût de modifier la **partie backend**, surtout avec la **génération aléatoire du Schtroumpf quotidien**. En plus de cela, j'ai décidé d'apprendre [Prisma](https://prisma.io) pour ce projet, puis [PostgreSQL](https://postgresql.org) plus tard."
    },
    {
        title: "Ical discord updater",
        subtitle: "Bot Discord",
        Icon: Bot,
        thumbnail: "/imgs/ical-discord.webp",
        code: "https://github.com/baptiste-may/ical-discord-updater",
        date: "Octobre 2023",
        duration: "1 mois",
        job: "Développeur Backend",
        teamSize: "Solo",
        tools: [
            "JavaScript",
            "DiscordJS",
            "Cron",
            "ICal"
        ],
        details: "Le but de ce projet été simplement de construire un bot Discord afin d'être **informé à chaque modification** de notre emploi du temps de fac. En effet, avec mes camarades de promo, nous avons créé un serveur Discord pour simplifier les communications. Ayant de multiples modifications d'agenda, j'ai donc développer ce petit bot pour nous informer de ces modifications.\n![Exemple de notification](/imgs/ical-discord-exemple.webp)\nLe bot n'était pas compliqué à faire mais personnes n'avait encore réaliser ce projet."
    },
    {
        title: "allcraft0r discord",
        subtitle: "Bot Discord et interface web",
        Icon: BotMessageSquare,
        thumbnail: "/imgs/allcraft0r.webp",
        code: "https://github.com/baptiste-may/allcraft0r-discord",
        url: "https://allcraft0r.may-baptiste.fr",
        date: "Novembre 2023",
        duration: "3 mois",
        job: "Développeur Fullstack",
        teamSize: "Solo",
        tools: [
            "TypeScript",
            "DiscordJS",
            "HeroUI",
            "PostgreSQL"
        ],
        details: "Étant le développeur du bot Discord du vidéaste [Allcraft0r](https://www.youtube.com/@allcraft0r), j'ai décidé de réécrire le code de l'ancien bot, utilisant encore du **JavaScript** avec des **commandes par message**, en **TypeScript** avec des **commandes slash** et en passant à [PostgreSQL](https://postgresql.org), tout juste appris.\nCe fait en passant, j'en ai profité pour réaliser un **site internet**, le web étant mon domaine de prédilection.\n![Page des commandes](/imgs/allcraft0r-cmds.webp)"
    },
    {
        title: "ESC Voting",
        subtitle: "Annimation Web",
        Icon: Monitor,
        thumbnail: "/imgs/esc-voting.gif",
        code: "https://github.com/Eurovision-Smoot-Contest/2022-voting-animation",
        url: "https://www.youtube.com/watch?v=V5gGPs3wSS4&t=6173s",
        date: "Décembre 2021",
        duration: "1 an",
        job: "Développeur Fullstack",
        teamSize: "Solo",
        tools: [
            "JavaScript",
            "Express",
            "GoogleAPI",
            "Socket.io"
        ],
        details: "![Extrait du récap](/imgs/esc-voting-recap.gif)\nLors de la création de l'édition 2022 de l'[Eurovision Smoot Contest](https://wiki.smoot.fr), en plus de la création de la 3D, notamment avec les **effets lumineux**, j'ai réalisé l'**animation de vote** lors du direct.\n![Extrait du Télévote](/imgs/esc-voting-exemple.gif)\nLe plus difficile fût de faire le lien entre la **page de commande** et la **page affichée lors du live**. Pour ce faire, j'ai utiliser un **websocket**, [Socket.IO](https://socket.io), que je n'avais jamais utilisé auparavant."
    },
    {
        title: "Python Battleship",
        subtitle: "Projet Annexe",
        Icon: CodeXml,
        thumbnail: "/imgs/python-battleship.webp",
        code: "https://github.com/baptiste-may/python-battleship",
        date: "Octobre 2023",
        duration: "1 mois",
        job: "Développeur Python",
        teamSize: "Solo",
        tools: [
            "Python"
        ],
        details: "Ce petit projet a été réalisé en **Python**. Il s'agisait simplement de réaliser une **simulation du jeu de société** [Bataille navale](https://fr.wikipedia.org/wiki/Bataille_navale).\n![Exemple de partie](/imgs/py-battleship-game.webp)\nL'intéré principal est de pouvoir créer sa propre classe, et donc **sa propre stratégie**. Les objets sont extrèmement simplifiés, permettant de faire des duels joueur contre joueur, joueur contre robot, ou encore robot contre robot. L'interface est également soigné.\n![Positionnement des bâteaux](/imgs/py-battleship-boats.webp)"
    },
];
