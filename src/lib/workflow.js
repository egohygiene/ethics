export const defaultWorkflow = Object.freeze({ image:1, text:1, video:10, otherIntentional:2, initialPrompt:1, otherTrial:2, intentionalAttempts:2, trialAttempts:5, acceptedIntentional:1, acceptedTrial:1 });
export function calculateWorkflows(input) {
  for (const key of Object.keys(defaultWorkflow)) {
    if (!Number.isFinite(input[key]) || input[key]<0) throw new Error(`${key} must be finite and non-negative.`);
  }
  for (const key of ["intentionalAttempts","trialAttempts","acceptedIntentional","acceptedTrial"]) if (!Number.isSafeInteger(input[key])) throw new Error(`${key} must be a whole number.`);
  const intentional=input.image+input.text+input.intentionalAttempts*input.video+input.otherIntentional;
  const trial=input.initialPrompt+input.trialAttempts*input.video+input.otherTrial;
  const intentionalPerAccepted=input.acceptedIntentional>0?intentional/input.acceptedIntentional:null;
  const trialPerAccepted=input.acceptedTrial>0?trial/input.acceptedTrial:null;
  const relativeDifference=trialPerAccepted!==null&&trialPerAccepted>0&&intentionalPerAccepted!==null?(trialPerAccepted-intentionalPerAccepted)/trialPerAccepted:null;
  return { intentional,trial,intentionalPerAccepted,trialPerAccepted,relativeDifference };
}
