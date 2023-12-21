countDown('2024', '02', '09', '19', '00');
blinking(
    4000, 4000,
    1, 3,
    75, 25,
    'counter-frame', 'party');

function countDown(year, month, day, hour, minute) {
    const days = document.getElementById('days');
    const hours = document.getElementById('hours');
    const minutes = document.getElementById('minutes');
    const seconds = document.getElementById('seconds');

    const date = Date.parse(`${year}-${month}-${day}T${hour}:${minute}:00.000+01:00`);

    function updateCounter() {
        const timeLeft = date - Date.now();

        if (timeLeft <= 0) return false;

        const daysLeft = timeLeft / (1000 * 60 * 60 * 24);
        days.textContent = Math.floor(daysLeft).toString();
        const daysRest = daysLeft % 1;
        const hoursLeft = daysRest * 24;
        hours.textContent = Math.floor(hoursLeft).toString();
        const hoursRest = hoursLeft % 1;
        const minutesLeft = hoursRest * 60;
        minutes.textContent = Math.floor(minutesLeft).toString();
        const minutesRest = minutesLeft % 1;
        const secondsLeft = minutesRest * 60;
        seconds.textContent = Math.floor(secondsLeft).toString();

        return true;
    }

    if (!updateCounter()) return;

    const countdownTimer = setInterval(() => {
        if (updateCounter()) return;

        clearInterval(countdownTimer);
        days.textContent = "0";
        hours.textContent = "0";
        minutes.textContent = "0";
        seconds.textContent = "0";
    }, 1000);
}

function blinking(minInterval, intervalRange, minBlinkTimes, blinkTimesRange, minOnOffDelay, onOffDelayRange, ...classNames) {
    const elements = []
    for (const className of classNames) {
        const classElements = document.getElementsByClassName(className);
        for (const classElement of classElements) elements.push(classElement);
    }

    const filter = getComputedStyle(document.documentElement).getPropertyValue('--glow');
    const shadow = getComputedStyle(document.documentElement).getPropertyValue('--shadow');

    function blink(frame, count) {
        let totalDelay = 0;
        for (let i = 0; i < count; i++) {
            setTimeout(() => frame.style.filter = shadow, totalDelay);

            totalDelay += Math.random() * onOffDelayRange + minOnOffDelay;
            setTimeout(() => frame.style.filter = filter, totalDelay);

            totalDelay += Math.random() * onOffDelayRange + minOnOffDelay;
        }
    }

    setInterval(() => {
        const element = elements[Math.floor(Math.random() * elements.length)];
        const amount = Math.floor(Math.random() * blinkTimesRange + minBlinkTimes);
        blink(element, amount)

    }, Math.random() * intervalRange + minInterval)
}