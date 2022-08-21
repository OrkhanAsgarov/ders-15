function YapilacakIs({is, tamamlandiYap}){

    return (
        <>
            <p> <input type="checkbox" checked={is.complete} onChange={()=>tamamlandiYap(is)} />  {is.title} {is.complete? '🆗' : '❌'}  </p>
        </>
    );
}


export default YapilacakIs;