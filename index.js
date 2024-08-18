let danimaElemList;
document.addEventListener('DOMContentLoaded', () => danimaElemList = document.querySelectorAll('.danima-elem'));

document.addEventListener('mousemove', (event) => {
    if (!danimaElemList.length) return;
    const mousePosition = getByAxis([event.clientX, event.clientY]);
    danimaElemList.forEach((elem) => {
        const elemCenter = getElemCenterPosition(elem);
        const relativeMousePosition = getByAxis([event.clientX - elemCenter.x, event.clientY - elemCenter.y]);

        const transition = elem.dataset.danimaTransition ?? '0.075s';
        elem.style.transition = `transform ${transition}`;

        const translation = getTranslation(elem, relativeMousePosition);
        const rotation = getRotation(elem, relativeMousePosition);
        const scale = getScale(elem, relativeMousePosition, mousePosition, elemCenter);
        elem.style.transform = `${translation} ${rotation} ${scale}`;
    });
});

function getTranslation(element, relativeMousePosition) {
    const speedValues = getPair(element.dataset.danimaTranslationSpeed ?? '0,0').map(n => (n / 10) * -1);
    const speed = getByAxis(speedValues);
    const limit = parseInt(element.dataset.danimaTranslationLimit ?? '0');
    const x = transformAxis('x', relativeMousePosition, speed, limit);
    const y = transformAxis('y', relativeMousePosition, speed, limit);
    return `translate(${x}px, ${y}px)`;
}

function getRotation(element, relativeMousePosition) {
    const speedValue = getPair(element.dataset.danimaRotationSpeed ?? '0,0')?.map(n => n / 20);
    const speed = getByAxis(speedValue);
    const limit = parseInt(element.dataset.danimaRotationLimit ?? '0');
    const x = transformAxis('x', relativeMousePosition, speed, limit);
    const y = transformAxis('y', relativeMousePosition, speed, limit);
    return `rotateX(${-y}deg) rotateY(${x}deg)`;
}

function getScale(element, relativeMousePosition, mousePosition, elemCenter) {
    if (!element.dataset.danimaScaleSpeed) return 'scale(1)'

    const speedValue = getPair(element.dataset.danimaScaleSpeed ?? '1,1')?.map(n => n / 1000);
    const speed = getByAxis(speedValue);

    const minValue = getPair(element.dataset.danimaScaleMin ?? '0.01, 0.01');
    const min = getByAxis(minValue);
    const maxValue = getPair(element.dataset.danimaScaleMax ?? '0.99, 0.99');
    const max = getByAxis(maxValue);

    const distance = getDistance(mousePosition, elemCenter);
    let x = transformScale('x', distance, relativeMousePosition, speed);
    let y = transformScale('y', distance, relativeMousePosition, speed);

    const minmaxFn = (axis, value) => {
        if (value < min[axis]) return min[axis];
        if (value > max[axis]) return max[axis];
        return value;
    }
    x = minmaxFn('x', x);
    y = minmaxFn('y', y);
    return `scaleX(${x}) scaleY(${y})`;
}

function transformAxis(axis, relativeMousePosition, speed, limit) {
    const factoredSpeed = relativeMousePosition[axis] * speed[axis];
    if (factoredSpeed > 0) {
        return limit ? Math.min(limit, factoredSpeed) : factoredSpeed;
    }
    return limit ? Math.max(-limit, factoredSpeed) : factoredSpeed;
}

function transformScale(axis, distance, relativeMousePosition, speed) {
    const sign = Math.sign(relativeMousePosition[axis]);
    return (sign ? 1 : -1) - (distance * speed[axis]);
}

function getElemCenterPosition(elem) {
    return {
        x: elem.offsetLeft + (elem.clientWidth / 2),
        y: elem.offsetTop + (elem.clientHeight / 2)
    };
}

function getDistance(pointA, pointB) {
    const x = Math.pow(pointB.x - pointA.x, 2);
    const y = Math.pow(pointB.y - pointA.y, 2);
    return Math.sqrt(x + y);
}

function getByAxis(values){
    return {
        x: values[0] ?? 0,
        y: values[1] ?? 0
    }
}

function getPair(rawValue) {
    return (rawValue ?? '0,0')
        .split(',')
        .map((value) => parseFloat(value));
}

function checkDistance(relativeMousePosition, maxDistance) {
    if (!maxDistance) {
        return true;
    }

    const distanceValue = getPair(maxDistance);
    const distance = getByAxis(distanceValue);

    const withinDistance = {
        x: distance.x > Math.abs(relativeMousePosition.x),
        y: distance.y > Math.abs(relativeMousePosition.y)
    };
    
    return withinDistance.x && withinDistance.y;
}