function checkForName(inputText) {
    console.log("::: Running checkForName :::", inputText);
    let regex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
    console.log(regex.test(inputText));
    return regex.test(inputText);
}

export { checkForName };
