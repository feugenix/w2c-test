import W2C from './w2c';
import sound from './sound';

let w2c = new W2C({ jsHostQuery: () => {} }, {
    sound
});

w2c.playSound('test');
w2c.dispatch('playSound', 'test1');
