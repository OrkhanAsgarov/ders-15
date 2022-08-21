export default function reducerYapilacaklar( mevcutStateVerisi , islem ) {
    switch (islem.ad) {
        case "TAMAMLANDI":
            return mevcutStateVerisi.map((yapilacakIs) => {
                if (yapilacakIs.id === islem.id) {
                  return { ...yapilacakIs, complete: true };
                } else {
                  return yapilacakIs;
                }
              });

        case "ILKVERILER":
            return islem.data;

        case "IPTALET":
            if( !mevcutStateVerisi.some( (eleman)=>{
                return eleman.id === islem.iptalId;
            } ) ) {
                alert( "İş bulunamadı." );
    
                return;
            }
            
            return mevcutStateVerisi.map((yapilacakIs) => {
                if (yapilacakIs.id === islem.iptalId) {
                  return { ...yapilacakIs, complete: false };
                } else {
                  return yapilacakIs;
                }
            });
        
        case "YENIEKLE":
            const yeniIs = {id:islem.id, title: islem.title, complete: false};
            return [ ...mevcutStateVerisi, yeniIs ];

        
    }
}
