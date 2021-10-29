const hostSizeDivider = 91099
const hostRotationSpeed = 0.01

export function getHostSize(window) {
    return window.innerWidth / hostSizeDivider
}

export function getHostRotSpeed() {
    return hostRotationSpeed
}