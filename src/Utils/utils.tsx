
export const scrollToTop = () => {
    return window.scrollTo(0,0);
}


export const changeTitleHeader = (title:string) => {
    document.title = title;
    return; 
}