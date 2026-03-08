// ─── Protocol Types ───────────────────────────────────────────────────────────

export type ActionType =
  | 'proof-of-eat'
  | 'proof-of-shelter'
  | 'proof-of-medicine'
  | 'proof-of-education'

export type ActionStatus = 'pending' | 'under_review' | 'verified' | 'rejected'

export interface ProtocolAction {
  id:          string        // e.g. 'poe_0x3f8a2c9e_1706...'
  type:        ActionType
  status:      ActionStatus
  submittedBy: string        // wallet address
  orgId?:      string
  timestamp:   number        // unix ms
  location: {
    city:      string
    country:   string
    countryCode: string
  }
  data: {
    meals?:     number       // proof-of-eat
    nights?:    number       // proof-of-shelter
    patients?:  number       // proof-of-medicine
    students?:  number       // proof-of-education
  }
  evidence:    string[]      // IPFS hashes
  txHash?:     string        // on-chain record
}

// ─── User / Identity Types ────────────────────────────────────────────────────

export type UserRole = 'participant' | 'validator' | 'org_admin' | 'observer'

export interface UserProfile {
  address:    string
  role:       UserRole
  orgId?:     string
  displayName?: string
  joinedAt:   number
}

// ─── Organization Types ───────────────────────────────────────────────────────

export interface Organization {
  id:          string
  name:        string
  verified:    boolean
  country:     string
  memberCount: number
  createdAt:   number
}

// ─── Network / Stats Types ────────────────────────────────────────────────────

export interface NetworkStats {
  totalVerifiedActions:  number
  totalMealsRecorded:    number
  countriesActive:       number
  organizationsOnboarded: number
  activeValidators:      number
  lastBlockRecorded:     number
}

export interface ValidatorActivity {
  validatorId: string
  action:      'approved' | 'rejected'
  recordId:    string
  timestamp:   number
}
