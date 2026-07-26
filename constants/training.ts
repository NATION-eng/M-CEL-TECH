import type { LucideIcon } from "lucide-react";
import {
  Sparkles,
  Video,
  Bot,
  Workflow,
  ClipboardList,
  GraduationCap,
  Briefcase,
  Building2,
  Rocket,
  Landmark,
  Users2,
  Cpu,
  Users,
  Hammer,
  Target,
  FolderGit2,
  UserCheck,
  Award,
  Sunset,
} from "lucide-react";

export type TrainingModule = {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  topics: string[];
  outcome: string;
};

export const TRAINING_MODULES: TrainingModule[] = [
  {
    id: "prompt-engineering",
    icon: Sparkles,
    title: "Prompt Engineering",
    description:
      "Learn how to communicate effectively with modern AI systems to generate high-quality content, solve complex problems, automate tasks, and improve productivity.",
    topics: [
      "Prompt fundamentals",
      "Prompt frameworks",
      "Business prompting",
      "Research prompting",
      "Content generation",
      "Workflow optimization",
    ],
    outcome: "Participants confidently interact with AI tools for professional work.",
  },
  {
    id: "cinematic-ai-video",
    icon: Video,
    title: "Cinematic AI Video Generation",
    description: "Create high-quality cinematic videos using modern AI-powered creative platforms.",
    topics: [
      "AI storytelling",
      "Scene generation",
      "Image-to-video",
      "Video enhancement",
      "Voice integration",
      "Editing workflow",
    ],
    outcome: "Participants produce professional marketing and educational videos.",
  },
  {
    id: "vibe-coding",
    icon: Bot,
    title: "Vibe Coding",
    description: "Learn modern AI-assisted software development techniques.",
    topics: [
      "AI coding assistants",
      "Rapid prototyping",
      "Frontend generation",
      "Backend generation",
      "Debugging",
      "Code review",
    ],
    outcome: "Participants build applications faster using AI.",
  },
  {
    id: "ai-automation",
    icon: Workflow,
    title: "AI Automation",
    description: "Automate repetitive business processes using modern AI tools.",
    topics: [
      "Workflow automation",
      "Business automation",
      "Document processing",
      "Scheduling",
      "Notifications",
      "AI integrations",
    ],
    outcome: "Participants automate repetitive work.",
  },
  {
    id: "project-management",
    icon: ClipboardList,
    title: "Project Management",
    description: "Learn professional project planning and execution.",
    topics: [
      "Planning",
      "Communication",
      "Agile",
      "Scrum",
      "Risk management",
      "Team collaboration",
      "Project documentation",
    ],
    outcome: "Participants deliver projects successfully.",
  },
];

export const WHO_SHOULD_ATTEND: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: GraduationCap,
    title: "University Students",
    description: "Build in-demand digital skills alongside your degree.",
  },
  {
    icon: Award,
    title: "Graduates",
    description: "Stand out in the job market with practical AI and project skills.",
  },
  {
    icon: Briefcase,
    title: "Working Professionals",
    description: "Boost your output and stay relevant in a fast-changing workplace.",
  },
  {
    icon: Building2,
    title: "Business Owners",
    description: "Apply automation and AI directly to your operations.",
  },
  {
    icon: Rocket,
    title: "Entrepreneurs",
    description: "Move faster from idea to execution with AI-assisted tools.",
  },
  {
    icon: Landmark,
    title: "Government Employees",
    description: "Bring modern digital productivity into public service delivery.",
  },
  {
    icon: Users2,
    title: "Corporate Teams",
    description: "Upskill together and standardize how your team works with AI.",
  },
  {
    icon: Cpu,
    title: "Technology Enthusiasts",
    description: "Go hands-on with the tools shaping the next decade of work.",
  },
];

export const WHY_BOOTCAMP: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Users,
    title: "Small Class Size",
    description: "Focused learning in an intimate group setting with direct, personalised instructor access throughout every session.",
  },
  {
    icon: Hammer,
    title: "Practical Learning",
    description: "Every module is built around doing the work, not just watching it.",
  },
  {
    icon: Target,
    title: "Industry Relevant Skills",
    description: "Curriculum is built around tools and workflows in active professional use.",
  },
  {
    icon: FolderGit2,
    title: "Real Projects",
    description: "Leave with completed, portfolio-ready work — not just notes.",
  },
  {
    icon: UserCheck,
    title: "Expert Mentorship",
    description: "Learn directly from practitioners who guide you through each exercise.",
  },
  {
    icon: Award,
    title: "Professional Certificate",
    description: "Receive an official M-CEL TECH Certificate of Completion.",
  },
];

export const TRAINING_STRUCTURE: string[] = [
  "Hybrid delivery",
  "Interactive sessions",
  "Practical demonstrations",
  "Hands-on exercises",
  "Question and answer sessions",
  "Real-world projects",
  "Continuous guidance",
  "Networking opportunities",
];

export const COHORT_ICON = Sunset;

export const PRICING_INCLUDES: string[] = [
  "All 5 learning modules",
  "Training materials & resources",
  "Live instructor-led evening sessions",
  "Certificate of Completion",
  "Community access",
  "Post-training support",
];

export const TRAINING_FAQS: { question: string; answer: string }[] = [
  {
    question: "Who can register?",
    answer:
      "Anyone 16 and older — students, graduates, working professionals, business owners, entrepreneurs, government employees, corporate teams, and technology enthusiasts are all welcome.",
  },
  {
    question: "Do I need prior experience?",
    answer:
      "No. The bootcamp is designed to take participants from foundational understanding to practical, confident use of AI tools, automation, and project delivery skills.",
  },
  {
    question: "Will I receive a certificate?",
    answer:
      "Yes. Participants who complete the bootcamp receive an official M-CEL TECH Certificate of Completion, generated using the name submitted at registration.",
  },
  {
    question: "How long is the training?",
    answer:
      "The bootcamp is a 2-week intensive Evening Class (7:00 PM – 9:00 PM). Everyone who registers belongs to a single cohort.",
  },
  {
    question: "How do I make payment?",
    answer:
      "Payment is made securely online through Paystack during registration. Your seat is confirmed automatically once payment succeeds.",
  },
  {
    question: "Can organizations register staff?",
    answer:
      "Yes. Corporate teams can register multiple staff members. Contact us on WhatsApp for group registration and organizational scheduling.",
  },
  {
    question: "What should I bring?",
    answer: "A laptop, a stable internet connection, and a willingness to build hands-on.",
  },
  {
    question: "Will sessions be recorded?",
    answer:
      "The programme is built around live, hands-on participation. Reach out to our team for specifics on your cohort's session format.",
  },
];
