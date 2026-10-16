import { UnoCard, UnoColor, UnoValue, UnoState } from '../types/game';

const COLORS: UnoColor[] = ['red', 'blue', 'green', 'yellow'];
const NUMBERS: UnoValue[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const ACTIONS: UnoValue[] = ['skip', 'reverse', 'draw2'];

export function createUnoDeck(): UnoCard[] {
  const deck: UnoCard[] = [];
  let id = 1;

  COLORS.forEach((color) => {
    // One 0 per color
    deck.push({ id: `c_${id++}`, color, value: '0' });

    // Two of 1-9 per color
    NUMBERS.slice(1).forEach((val) => {
      deck.push({ id: `c_${id++}`, color, value: val });
      deck.push({ id: `c_${id++}`, color, value: val });
    });

    // Two of action cards per color
    ACTIONS.forEach((action) => {
      deck.push({ id: `c_${id++}`, color, value: action });
      deck.push({ id: `c_${id++}`, color, value: action });
    });
  });

  // 4 Wild cards and 4 Wild Draw 4 cards
  for (let i = 0; i < 4; i++) {
    deck.push({ id: `c_${id++}`, color: 'wild', value: 'wild' });
    deck.push({ id: `c_${id++}`, color: 'wild', value: 'wild4' });
  }

  // Shuffle Fisher-Yates
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }

  return deck;
}

export function initUnoGame(player1Id: string, player2Id: string): {
  unoState: UnoState;
  remainingDeck: UnoCard[];
} {
  const deck = createUnoDeck();

  // Deal 7 cards each
  const p1Hand = deck.splice(0, 7);
  const p2Hand = deck.splice(0, 7);

  // Find a starting top card that is NOT wild
  let topCardIndex = deck.findIndex((c) => c.color !== 'wild' && !['skip', 'reverse', 'draw2'].includes(c.value));
  if (topCardIndex === -1) {
    topCardIndex = deck.findIndex((c) => c.color !== 'wild');
  }
  const topCard = deck.splice(topCardIndex >= 0 ? topCardIndex : 0, 1)[0];
  const activeColor = topCard.color === 'wild' ? 'red' : topCard.color;

  const unoState: UnoState = {
    currentTurnPlayerId: player1Id,
    topCard,
    activeColor,
    playerHands: {
      [player1Id]: p1Hand,
      [player2Id]: p2Hand
    },
    drawPileCount: deck.length,
    unoCalled: {
      [player1Id]: false,
      [player2Id]: false
    },
    lastActionMessage: 'Permainan UNO dimulai! Giliran pertama.'
  };

  return { unoState, remainingDeck: deck };
}

export function isValidUnoMove(card: UnoCard, topCard: UnoCard, activeColor: UnoColor): boolean {
  if (card.color === 'wild') return true;
  if (card.color === activeColor) return true;
  if (card.value === topCard.value) return true;
  return false;
}
