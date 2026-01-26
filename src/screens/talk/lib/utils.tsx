import { Session } from '@/types'

export const findTalk = (
  talkId: string | string[] | undefined,
  { dayOne, dayTwo }: { dayOne: Session[]; dayTwo: Session[] }
) => {
  const talkDay1 = dayOne.find(session => session.id === talkId)
  if (talkDay1) {
    return { talk: talkDay1, isDayOne: true }
  }
  const talkDay2 = dayTwo.find(session => session.id === talkId)
  if (talkDay2) {
    return { talk: talkDay2, isDayOne: false }
  }

  return { talk: null, isDayOne: false }
}
