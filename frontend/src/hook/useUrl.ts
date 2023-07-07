import {useState} from "react";

function useUrl() {
    const [backUrl, setBackUrl] = useState<string>('');

    function saveBackUrl() {
        const currentUrl = window.location.href;
        localStorage.setItem('backUrl', currentUrl);
        setBackUrl(currentUrl);
    }

    return {backUrl, saveBackUrl};
}

export default useUrl;
