import heroConsultancyWorkspace from '../assets/images/hero_consultancy_workspace_1795315314323.jpg';
import editorialAuditDesk from '../assets/images/editorial_audit_desk_1795315313865.jpg';
import insightsB2bStrategy from '../assets/images/insights_b2b_strategy_1795315314112.jpg';

export const MEDIA = {
  heroWorkspace: {
    src: heroConsultancyWorkspace,
    alt: 'Minimalist Australian consultancy desk with printed website audit architecture, analytics layouts, and natural window daylight.',
  },
  auditDesk: {
    src: editorialAuditDesk,
    alt: 'Laptop displaying a structured strategy roadmap beside matte index cards and a notebook on a stone-grey desk.',
  },
  advisoryRoom: {
    src: insightsB2bStrategy,
    alt: 'Quiet contemporary Australian advisory meeting room with timber table and charcoal chairs.',
  },
} as const;
