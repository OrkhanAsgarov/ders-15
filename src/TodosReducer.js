import React from "react";
import YapilacakIs from "./YapilacakIs";
// import ilkYapilacaklarObjesi from './data/yapilacaklarData';
import reducerYapilacaklar from './reducers/reducerYapilacaklar';

function TodosReducer() {
    const [yapilacaklar, dispatchYapilacaklar] = React.useReducer(reducerYapilacaklar, []);
    //const [yapilacaklar, yapilacaklarGuncelle] = React.useState([]);
    const iptalInput = React.useRef(null);
    const ekleInput = React.useRef(null);
    const idInput = React.useRef(null);

    React.useEffect(()=>{
        const yapilacaklarVerisiAl = async ()=>{
            const resp = await fetch("yapilacaklarData.json");
            const ilkYapilacaklarObjesi = await resp.json();
            dispatchYapilacaklar({ad: "ILKVERILER", data: ilkYapilacaklarObjesi});
        };

        yapilacaklarVerisiAl();

    }, [dispatchYapilacaklar])

    function tamamlandiYap(guncellenecekIs) {
        dispatchYapilacaklar({ad: "TAMAMLANDI", id: guncellenecekIs.id});
    }

    function iptalEt() {
        const iptalDegeri = parseInt(iptalInput.current.value);
        dispatchYapilacaklar( { ad:"IPTALET", iptalId: iptalDegeri } );
    }

    function yeniEkle() {
        const yeniTitle = ekleInput.current.value;
        const yeniId = parseInt(idInput.current.value);

        dispatchYapilacaklar( {ad: "YENIEKLE", title: yeniTitle, id: yeniId} );
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


export default TodosReducer;