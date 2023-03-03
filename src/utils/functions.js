export const upperfirstletter = (str) => {
    const meaning = str.split(" ")
    let tempMeaning = []
    for (let i = 0; i < meaning.length; i++) {
        let words = ""
        for (let j = 0; j < meaning[i].length; j++) {
            if (j === 0) {
                words += meaning[i][j].toUpperCase()
            } else {
                words += meaning[i][j].toLowerCase()
            }
        }
        tempMeaning.push(words)
    }
    const editedMeaning = tempMeaning.join(" ")
    return editedMeaning
}