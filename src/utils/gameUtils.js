export const calculateDamage = (base, armor) => {
    return Math.max(0, base - armor * 0.2);
};

export const getRandomSpawn = () => {
    return {
        x: Math.floor(Math.random() * 800),
        y: Math.floor(Math.random() * 600),
    };
};

export const isColliding = (objA, objB) => {
    const distX = Math.abs(objA.x - objB.x);
    const distY = Math.abs(objA.y - objB.y);
    return distX < 50 && distY < 50;
};
