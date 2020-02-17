import express from 'express';

import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from './middleware/cors';

// Routes
import videoRoute from './routes/videoRoute';

class app {

  constructor(){
    this.app = express();
    this.config()
  }

  config() {
    this.app.use(morgan('combined'));
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
    this.app.use(cors);
    
    this.app.use('/api/video', videoRoute);
    
    //const loggerFormat = ':id [:date[web]] ":method :url" :status :response-time';
    
    this.app.use((error, req, res, next) => {
      res.status(error.status || 500).json({
        error: {
          error: 'Something went wrong...',
        }
      });
    });
    
  }
}

module.exports = new app().app




