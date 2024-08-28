function checkURL(inputText) {
    const regex = /^(ftp|http|https):\/\/[^ "]+$/;
    return regex.test(inputText);
}

export { checkURL };
