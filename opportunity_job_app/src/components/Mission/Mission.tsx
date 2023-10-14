import Link from "next/link"
import './mission.scss'

type ContentType = {
    urlImg: string;
    text: string;
}

const Mission = () => {
    const content: ContentType[] = [
        { urlImg: '/images/mision.svg', text: 'Misija: Atina se zalaže za uspostavljanje ravnopravnog statusa svih članova društva u javnoj i privatnoj sferi, kroz identifikaciju i borbu protiv rodno zasnovane marginalizacije, diskriminacije i nasilja. Poseban fokus Atininog rada čine deca i mladi, naročito oni koji dolaze iz ranjivih grupa i nisu imali jednake prilike kao ostali (deca i mladi bez osnovnog obrazovanja i roditeljskog staranja). Baveći se uzrocima viktimizacije i ranjivosti, Atina sprovodi aktivnosti koje imaju za cilj promenu patrijarhalnih normi i promovisanje ženskog aktivizma i liderstva.'},
        { urlImg: '/images/vision.svg', text: 'Vizija: Žene i devojčice - nezavisne, osnažene, slobodne da same biraju i zauzimaju se za sebe, predstavljaju glavni cilj koji Atina stremi da ostvari'},
    ];
    return(
        <div className="mission">
            <div className="mission__container">
                <div className="mission__top">
                    <img className="mission__top-image mission__top-image--left" src="/images/mision-top-left.png" alt="image" />
                    <img className="mission__top-image mission__top-image--rigth" src="/images/mission-bottom-right.png" alt="image" />
                    <h2 className="mission__title">MISIJA I VIZIJA</h2>
                </div>
                <div className="mission__content">
                   <ul className="mission__content-list">
                    {content.map((cont, index) => (
                        <li key={index} className="mission__content-item">
                            <img src={cont.urlImg} alt="icon" />
                            <p>{cont.text}</p>
                        </li>
                    ))}
                   </ul>
                </div>
            </div>
        </div>
    )
}

export default Mission