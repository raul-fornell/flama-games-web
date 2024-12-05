const MAX_TIME = 1000;
const MIN_DISTANCE = 100;

let lastX;

function mouseX(event) {
    if (event.clientX) {
        return event.clientX;
    } else if (event.touches[0]) {
        return event.touches[0].clientX;
    }
    return lastX;
}

function swipe(el, condition, callback) {
    let x, timestamp;
    const start = event => {
        x = mouseX(event);
        timestamp = + new Date();
    };
    const storeX = event => lastX = mouseX(event);
    const stop = event => {
        const now = + new Date();
        if (now < timestamp + MAX_TIME) {
            if (condition(event, x)) {
                callback();
            }
        }
    };
    
    el.addEventListener('mousedown', start);
    el.addEventListener('mouseup', stop);
    
    el.addEventListener('touchstart', start);
    el.addEventListener('touchmove', storeX);
    el.addEventListener('touchend', stop);
}

function swipeLeft(el, callback) {
    swipe(el, (event, x) => mouseX(event) < x - MIN_DISTANCE, callback);
}

function swipeRight(el, callback) {
    swipe(el, (event, x) => mouseX(event) > x + MIN_DISTANCE, callback);
}