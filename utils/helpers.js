module.exports = {
    // Function to get the current date
    format_date: (date) => {
        const date = new Date();
        return date.toLocaleDateString();
    }
}