function H1({content}: {
    content: string;
}) {
    return <h1 className="font-bold text-4xl mt-8 mb-4 border-b text-center">{content}</h1>;
}

function H2({content}: {
    content: string;
}) {
    return <h2 className="font-bold text-2xl my-2">{content}</h2>;
}

export default function Page() {
    return (
        <div className="flex flex-col gap-1 md:container md:mx-auto px-4 pb-8 overflow-auto h-screen">
            <H1 content="Politique de Confidentialité"/>

            <H2 content="Collecte des données"/>
            <p>{`Ce site utilise Google Analytics, un service d'analyse web fourni par Google Inc. Google Analytics collecte des données anonymes sur l'utilisation du site, telles que les pages visitées, le temps passé sur chaque page et les tendances générales de navigation. Ces données sont utilisées uniquement pour analyser les tendances des utilisateurs et améliorer l'expérience utilisateur. Aucune information permettant d'identifier personnellement les utilisateurs n'est collectée.`}</p>

            <H2 content="Finalité des données collectées"/>
            <p>{`Les données collectées via Google Analytics sont utilisées pour analyser le comportement des utilisateurs sur le site, améliorer l'expérience utilisateur et optimiser les performances du site. Ces données sont anonymisées et ne permettent pas d'identifier personnellement les utilisateurs.`}</p>

            <H2 content="Durée de conservation des données"/>
            <p>Les données collectées par Google Analytics sont conservées pendant une durée de 14 mois, conformément aux recommandations du RGPD.</p>

            <H2 content="Droits des utilisateurs"/>
            <p>Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants concernant vos données personnelles :</p>
            <ul className="list-disc pl-4">
                <li>{`Droit d'accès : Vous pouvez demander à accéder à vos données personnelles.`}</li>
                <li>Droit de rectification : Vous pouvez demander la correction de vos données personnelles si elles sont inexactes.</li>
                <li>{`Droit à l'effacement : Vous pouvez demander la suppression de vos données personnelles.`}</li>
                <li>Droit à la portabilité : Vous pouvez demander à recevoir vos données personnelles dans un format structuré, couramment utilisé et lisible par machine.</li>
                <li>{`Droit d'opposition : Vous pouvez vous opposer au traitement de vos données personnelles.`}</li>
            </ul>
            <p>{`Pour exercer ces droits, veuillez contacter Baptiste MAY à l'adresse email suivante : pro@may-baptiste.fr.`}</p>

            <H2 content="Sécurité des données"/>
            <p>{`Baptiste MAY met en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données personnelles contre toute perte, destruction, altération, accès non autorisé ou divulgation. Cependant, aucune méthode de transmission ou de stockage électronique n'est totalement sûre, et nous ne pouvons garantir une sécurité absolue.`}</p>

            <H2 content="Modifications de la politique de confidentialité"/>
            <p>Baptiste MAY se réserve le droit de modifier cette politique de confidentialité à tout moment. Les modifications seront publiées sur cette page et entreront en vigueur immédiatement. Nous vous encourageons à consulter régulièrement cette page pour vous tenir informé des éventuelles modifications.</p>

            <H1 content="Mentions Légales"/>

            <H2 content="Éditeur du site"/>
            <p>Baptiste MAY</p>
            <p>{`911 Rue d'aire`}</p>
            <p>62400 Béthune</p>
            <p>France</p>
            <p>Email : pro@may-baptiste.fr</p>
            <p>Téléphone : 07 68 12 05 91</p>

            <H2 content="Hébergeur du site"/>
            <p>IONOS SARL</p>
            <p>7, place de la Gare, BP 70109</p>
            <p>57200 Sarreguemines</p>
            <p>France</p>
            <p>Téléphone : 0970 808 911</p>

            <H2 content="Propriété intellectuelle"/>
            <p>Certaines images présentes sur ce site proviennent de sources externes et sont utilisées conformément aux licences appropriées. Les crédits sont attribués aux créateurs originaux lorsque requis</p>

            <H2 content="Responsabilité"/>
            <p>{`Baptiste MAY s'efforce de fournir des informations précises et à jour sur ce site. Cependant, Baptiste MAY ne peut garantir l'exactitude, la complétude ou l'actualité des informations diffusées sur le site. Baptiste MAY ne peut être tenu responsable des dommages directs ou indirects résultant de l'utilisation de ce site.`}</p>
        </div>
    );
}