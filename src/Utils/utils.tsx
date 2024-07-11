
export const scrollToTop = () => {
    return window.scrollTo(0,0);
}


export const changeTitleHeader = (title:string) => {
    document.title = title;
    return; 
}

export const isValidUrl = (url:string) => {

    let urlPattern = new RegExp('^(https?:\\/\\/)?'+ 
	    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+
	    '((\\d{1,3}\\.){3}\\d{1,3}))'+
	    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+
	    '(\\?[;&a-z\\d%_.~+=-]*)?'+
	    '(\\#[-a-z\\d_]*)?$','i');
        
    return !!urlPattern.test(url);
}