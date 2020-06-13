

//=======================
// PORT
//=======================
process.env.PORT = process.env.PORT || 3000;

//=======================
// ENVIROMENT
//=======================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//=======================
// TOKEN EXPIRATION
//=======================
process.env.TOKEN_EXPIRATION = 60 * 60 * 24 * 30;
// process.env.SEED = process.env.SEED  || 'seed-app';
process.env.SEED = process.env.SEED  || 'seed-app-dev';


//=======================
// SEED
//=======================