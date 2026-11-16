import test from "node:test";
import assert from "node:assert/strict";
import { calculateWorkflows, defaultWorkflow } from "../src/lib/workflow.js";
test("workflow accounts for all preparation, attempts, overhead, and accepted outputs",()=>{
  const r=calculateWorkflows({...defaultWorkflow,acceptedIntentional:2});
  assert.equal(r.intentional,24);assert.equal(r.trial,53);assert.equal(r.intentionalPerAccepted,12);assert.equal(r.trialPerAccepted,53);
});
test("extra preparation can reverse the hypothesized advantage",()=>{
  const r=calculateWorkflows({...defaultWorkflow,image:100});
  assert.ok(r.relativeDifference<0);
});
test("no accepted output or zero baseline yields an undefined comparison",()=>{
  assert.equal(calculateWorkflows({...defaultWorkflow,acceptedIntentional:0}).intentionalPerAccepted,null);
  assert.equal(calculateWorkflows({...defaultWorkflow,acceptedTrial:0}).relativeDifference,null);
  assert.equal(calculateWorkflows({...defaultWorkflow,initialPrompt:0,video:0,otherTrial:0}).relativeDifference,null);
});
test("invalid counts and non-finite costs cannot create misleading outputs",()=>{
  for(const bad of [{video:Infinity},{image:-1},{intentionalAttempts:1.5},{acceptedTrial:NaN}])assert.throws(()=>calculateWorkflows({...defaultWorkflow,...bad}));
});
