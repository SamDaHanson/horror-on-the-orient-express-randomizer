import { useState } from 'react'
import { InvestigatorSelectScreen } from './components/InvestigatorSelectScreen'
import { MainGameSetupScreen } from './components/MainGameSetupScreen'
import { SetupScreen } from './components/SetupScreen'
import { SkillsAttributesScreen } from './components/SkillsAttributesScreen'
import { SummaryScreen } from './components/SummaryScreen'
import { SuspectsScreen } from './components/SuspectsScreen'
import { dealInvestigators, type InvestigatorSlot } from './dealInvestigators'
import {
  dealMainSetup,
  shouldShowMainSetup,
  type MainSetupDeal,
} from './dealMainSetup'
import { dealSkills, shouldShowSkills, type AbilityPick, type SkillsDeal } from './dealSkills'
import {
  dealSuspects,
  shouldShowSuspects,
  type SuspectsDeal,
} from './dealSuspects'
import { initialSetup } from './logic'
import type { SetupState, WizardStep } from './types'
import './App.css'

function App() {
  const [step, setStep] = useState<WizardStep>('setup')
  const [setup, setSetup] = useState<SetupState>(initialSetup)
  const [mainDeal, setMainDeal] = useState<MainSetupDeal | null>(null)
  const [slots, setSlots] = useState<InvestigatorSlot[]>([])
  const [picks, setPicks] = useState<Record<string, string>>({})
  const [skillsDeal, setSkillsDeal] = useState<SkillsDeal | null>(null)
  const [abilityPicks, setAbilityPicks] = useState<Record<string, AbilityPick>>(
    {},
  )
  const [suspectsDeal, setSuspectsDeal] = useState<SuspectsDeal | null>(null)

  function investigatorIds(): string[] {
    return Object.values(picks)
  }

  function startRandomize() {
    const nextMainDeal = dealMainSetup(setup)
    setMainDeal(nextMainDeal)
    setSlots(dealInvestigators(setup))
    setPicks({})
    setSkillsDeal(dealSkills(setup))
    setAbilityPicks({})
    setSuspectsDeal(null)
    setStep(shouldShowMainSetup(setup) ? 'mainSetup' : 'investigators')
  }

  function rerollInvestigators() {
    setSlots(dealInvestigators(setup))
    setPicks({})
    setSuspectsDeal(null)
  }

  function pickCharacter(slotId: string, characterId: string) {
    setPicks((current) => ({ ...current, [slotId]: characterId }))
    setSuspectsDeal(null)
  }

  function pickSkill(slotId: string, skillId: string) {
    setAbilityPicks((current) => {
      const existing = current[slotId]
      const nextSkillId = existing?.skillId === skillId ? undefined : skillId
      return { ...current, [slotId]: { ...existing, skillId: nextSkillId } }
    })
  }

  function pickAttribute(slotId: string, attributeId: string) {
    setAbilityPicks((current) => {
      const existing = current[slotId]
      const nextAttributeId =
        existing?.attributeId === attributeId ? undefined : attributeId
      return {
        ...current,
        [slotId]: { ...existing, attributeId: nextAttributeId },
      }
    })
  }

  function openSuspects() {
    setSuspectsDeal(
      (current) => current ?? dealSuspects(setup, investigatorIds()),
    )
    setStep('suspects')
  }

  function afterInvestigators() {
    if (shouldShowSkills(setup)) {
      setStep('skills')
      return
    }
    if (shouldShowSuspects(setup)) {
      openSuspects()
      return
    }
    setStep('summary')
  }

  function afterSkills() {
    if (shouldShowSuspects(setup)) {
      openSuspects()
      return
    }
    setStep('summary')
  }

  function backFromSummary() {
    if (shouldShowSuspects(setup)) {
      setStep('suspects')
      return
    }
    if (shouldShowSkills(setup)) {
      setStep('skills')
      return
    }
    setStep('investigators')
  }

  function restartFromSummary() {
    setMainDeal(null)
    setSlots([])
    setPicks({})
    setSkillsDeal(null)
    setAbilityPicks({})
    setSuspectsDeal(null)
    setStep('setup')
  }

  function backFromInvestigators() {
    setStep(shouldShowMainSetup(setup) ? 'mainSetup' : 'setup')
  }

  function backFromSuspects() {
    setStep(shouldShowSkills(setup) ? 'skills' : 'investigators')
  }

  return (
    <main
      className={`app ${step === 'setup' ? '' : 'is-wide'}`}
    >
      {step === 'setup' ? (
        <SetupScreen
          setup={setup}
          onChange={setSetup}
          onNext={startRandomize}
        />
      ) : null}
      {step === 'mainSetup' && mainDeal ? (
        <MainGameSetupScreen
          deal={mainDeal}
          onBack={() => setStep('setup')}
          onReroll={() => setMainDeal(dealMainSetup(setup))}
          onContinue={() => setStep('investigators')}
        />
      ) : null}
      {step === 'investigators' ? (
        <InvestigatorSelectScreen
          setup={setup}
          slots={slots}
          picks={picks}
          onPick={pickCharacter}
          onBack={backFromInvestigators}
          onReroll={rerollInvestigators}
          onContinue={afterInvestigators}
          continueLabel={
            shouldShowSkills(setup) || shouldShowSuspects(setup)
              ? 'Continue'
              : 'Finish & Summarize'
          }
        />
      ) : null}
      {step === 'skills' && skillsDeal ? (
        <SkillsAttributesScreen
          deal={skillsDeal}
          slots={slots}
          picks={abilityPicks}
          onPickSkill={pickSkill}
          onPickAttribute={pickAttribute}
          onBack={() => setStep('investigators')}
          onReroll={() => {
            setSkillsDeal(dealSkills(setup))
            setAbilityPicks({})
          }}
          onContinue={afterSkills}
          continueLabel={
            shouldShowSuspects(setup) ? 'Continue' : 'Finish & Summarize'
          }
        />
      ) : null}
      {step === 'suspects' && suspectsDeal ? (
        <SuspectsScreen
          deal={suspectsDeal}
          onBack={backFromSuspects}
          onReroll={() =>
            setSuspectsDeal(dealSuspects(setup, investigatorIds()))
          }
          onFinish={() => setStep('summary')}
        />
      ) : null}
      {step === 'summary' ? (
        <SummaryScreen
          setup={setup}
          mainDeal={mainDeal}
          slots={slots}
          investigatorPicks={picks}
          skillsDeal={skillsDeal}
          abilityPicks={abilityPicks}
          suspectsDeal={suspectsDeal}
          onBack={backFromSummary}
          onRestart={restartFromSummary}
        />
      ) : null}
    </main>
  )
}

export default App
