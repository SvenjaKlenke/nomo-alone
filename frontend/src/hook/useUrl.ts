import {useState} from "react";


function useUrl() {

    const [backUrl, setBackUrl] = useState<string>('');


    function saveBackUrl() {
        setBackUrl(window.location.href);
    }

    return {backUrl, saveBackUrl};
}

export default useUrl;