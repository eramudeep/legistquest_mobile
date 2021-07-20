export default function getIcon(type) {
    switch (type) {
        case "logo":
            return require("../assets/icon/legiLogo.png");
        case "google":
            return require("../assets/icon/search.png");
        default:
            return require("../assets/icon/legiLogo.png")
    }
}