import React, { useEffect, useRef } from "react";
import YapilacakIs from "./YapilacakIs";
// import ilkYapilacaklarObjesi from './data/yapilacaklarData';

function Todos() {
    // const [yapilacaklar, dispatch] = useReducer(reducer, ilkYapilacaklarObjesi);
    const [yapilacaklar, yapilacaklarGuncelle] = React.useState([]);
    const iptalInput = useRef(null);
    const ekleInput = useRef(null);
    const idInput = useRef(null);

    useEffect(()=>{
        const yapilacaklarVerisiAl = async ()=>{
            const resp = await fetch("yapilacaklarData.json");
            const ilkYapilacaklarObjesi = await resp.json();
            yapilacaklarGuncelle(ilkYapilacaklarObjesi);
        };

        yapilacaklarVerisiAl();

    }, [yapilacaklarGuncelle])

    function tamamlandiYap(guncellenecekIs) {
        const yeniListe = yapilacaklar.map((yapilacakIs) => {
            if (yapilacakIs.id === guncellenecekIs.id) {
              return { ...yapilacakIs, complete: true };
            } else {
              return yapilacakIs;
            }
          });

          yapilacaklarGuncelle(yeniListe);
    }

    function iptalEt() {
        const iptalDegeri = parseInt(iptalInput.current.value);

        if( !yapilacaklar.some( (eleman)=>{
            return eleman.id === iptalDegeri;
        } ) ) {
            alert( "İş bulunamadı." );

            return;
        }
        
        const yeniListe = yapilacaklar.map((yapilacakIs) => {
            if (yapilacakIs.id === iptalDegeri) {
              return { ...yapilacakIs, complete: false };
            } else {
              return yapilacakIs;
            }
          });

          yapilacaklarGuncelle(yeniListe);
    }

    function yeniEkle() {
        const yeniTitle = ekleInput.current.value;
        const yeniId = parseInt(idInput.current.value);
        const yeniIs = {id:yeniId, title: yeniTitle, complete: false};
        const yeniListe = [ ...yapilacaklar, yeniIs ];

        yapilacaklarGuncelle(yeniListe);
    }

    if (yapilacaklar.length < 1)
        return <>Liste boş.</>

    return (
        <>
            <div>
                {
                    yapilacaklar.map((yapilacakIs)=>{
                        return (
                        <YapilacakIs 
                            is={yapilacakIs} 
                            tamamlandiYap={tamamlandiYap} 
                            key={yapilacakIs.id} 
                        /> 
                        )
                    }) 
                }
            </div>

            <div>
                <input ref={iptalInput} type="text" /> 
                <button onClick={iptalEt}>İptal</button>
            </div>

            <div style={{display:"flex"}}>
                <input style={{width:"3rem"}} placeholder="id" ref={idInput} type="number" /> 
                <input style={{flex:4}} placeholder="İş adı" ref={ekleInput} type="text" /> 
                <button onClick={yeniEkle}>Ekle</button>
            </div>
        </>
    );
}


export default Todos;