const cron = require("node-cron");
const config = require("config");
const logger = require("./logger.js");

const questions = config.get("Questions");
const cron_schedule = config.get("cron_schedule");
const singapore_question_cycle = config.get("singapore_question_cycle");
const usa_question_cycle = config.get("usa_question_cycle");
const cron_schedule_day_of_month = config.get("cron_schedule_day_of_month");
const cron_schedule_hour_of_day = config.get("cron_schedule_hour_of_day");
const cron_schedule_day_of_week = config.get("cron_schedule_day_of_week");

// const cron_schedule = `0 ${cron_schedule_hour_of_day} ${cron_schedule_day_of_month} * ${cron_schedule_day_of_week}`

// cron job starts here
cron.schedule(cron_schedule, () => {
const currentDate = new Date();
logger.info(`Starting Cron Job at: ${currentDate}`);
assignQuestions();
})

// this object holds the current cycle of the questions
let questionCycle = {
  Singapore: singapore_question_cycle,
  USA: usa_question_cycle,
};

// this object holds the current question
let regionQuestions = {
  singapore_question: "",
  usa_question: ""
}

let singaporeQuestionsLengthCompleted = false;
let usaQuestionsLengthCompleted = false;
let firstIterationSingaporeFlag = false;
let firstIterationUSAFlag = false;

async function assignQuestions() {
  try {
    logger.info("Getting Started to Assign Questions Based on Region");
    let questionsUpdatedFlagForSingapore = false;
    let questionsUpdatedFlagForUSA = false;

    if (!singaporeQuestionsLengthCompleted) {
      if (questionCycle.Singapore + 1 < questions.Singapore_Questions.length){
        regionQuestions.singapore_question = questions.Singapore_Questions[questionCycle.Singapore + 1];
        logger.info("Singapore Region Question Rotated!");
        questionCycle.Singapore++;
        questionsUpdatedFlagForSingapore = true;
      }
    }

    if (!usaQuestionsLengthCompleted) {
      if (questionCycle.USA + 1 < questions.US_Questions.length){
        regionQuestions.usa_question = questions.US_Questions[questionCycle.USA + 1];
        logger.info("USA Region Question Rotated!");
        questionCycle.USA++;
        questionsUpdatedFlagForUSA = true;
      }
    } 

    if (!questionsUpdatedFlagForSingapore) {
      if (!firstIterationSingaporeFlag) {
        questionCycle.Singapore = 0;
        firstIterationSingaporeFlag = true;
      }
      if (questionCycle.Singapore < questions.US_Questions.length) {
        singaporeQuestionsLengthCompleted = true;
        regionQuestions.singapore_question = questions.US_Questions[questionCycle.Singapore];
        logger.info("Singapore Region Question Rotated based on USA Question!");
        questionCycle.Singapore++;
      } else {
        singaporeQuestionsLengthCompleted = false;
        questionCycle.Singapore = -1;
        firstIterationSingaporeFlag = false;
      } 
    }

    if (!questionsUpdatedFlagForUSA) {
      if (!firstIterationUSAFlag) {
        questionCycle.USA = 0;
        firstIterationUSAFlag = true;
      }  
      if (questionCycle.USA < questions.Singapore_Questions.length) {
        usaQuestionsLengthCompleted = true;
        regionQuestions.usa_question = questions.Singapore_Questions[questionCycle.USA];
        logger.info("USA Region Question Rotated based on Singapore Question!");
        questionCycle.USA++;
      } else {    
        usaQuestionsLengthCompleted = false;
        questionCycle.USA = -1;
        firstIterationUSAFlag = false;
      } 
    }
    console.log("Region Questions", regionQuestions)
  } catch (err) {
    logger.error(
      `System caught an exception error, please view the details. Error: , ${err}`
    );
  }
}
