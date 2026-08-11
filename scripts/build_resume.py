"""Build the downloadable one-page resume used by the portfolio."""

from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase import pdfmetrics
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    FrameBreak,
    HRFlowable,
    PageTemplate,
    Paragraph,
    Spacer,
)


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "resume.pdf"

INK = colors.HexColor("#18181B")
TEXT = colors.HexColor("#4B4B52")
MUTED = colors.HexColor("#68686F")
def register_fonts() -> tuple[str, str]:
    windows_fonts = Path("C:/Windows/Fonts")
    regular = windows_fonts / "arial.ttf"
    bold = windows_fonts / "arialbd.ttf"

    if regular.exists() and bold.exists():
        pdfmetrics.registerFont(TTFont("ResumeSans", str(regular)))
        pdfmetrics.registerFont(TTFont("ResumeSans-Bold", str(bold)))
        return "ResumeSans", "ResumeSans-Bold"

    return "Helvetica", "Helvetica-Bold"


FONT, FONT_BOLD = register_fonts()

TITLE = ParagraphStyle(
    "Title",
    fontName=FONT_BOLD,
    fontSize=26,
    leading=28,
    textColor=INK,
    spaceAfter=2,
)
SUBTITLE = ParagraphStyle(
    "Subtitle",
    fontName=FONT_BOLD,
    fontSize=10.2,
    leading=12,
    textColor=INK,
    spaceAfter=4,
)
CONTACT = ParagraphStyle(
    "Contact",
    fontName=FONT,
    fontSize=7.4,
    leading=9,
    textColor=MUTED,
)
SECTION = ParagraphStyle(
    "Section",
    fontName=FONT_BOLD,
    fontSize=16.2,
    leading=18.2,
    textColor=INK,
    spaceBefore=7,
    spaceAfter=0,
)
ROLE = ParagraphStyle(
    "Role",
    fontName=FONT,
    fontSize=11.8,
    leading=13.5,
    textColor=INK,
    spaceAfter=1,
)
COMPANY = ParagraphStyle(
    "Company",
    fontName=FONT_BOLD,
    fontSize=9,
    leading=10.5,
    textColor=INK,
    spaceAfter=1,
)
META = ParagraphStyle(
    "Meta",
    fontName=FONT,
    fontSize=7.8,
    leading=9.2,
    textColor=MUTED,
    spaceAfter=3.5,
)
BODY = ParagraphStyle(
    "Body",
    fontName=FONT,
    fontSize=7.9,
    leading=9.5,
    textColor=TEXT,
    spaceAfter=2,
)
BULLET = ParagraphStyle(
    "Bullet",
    parent=BODY,
    leftIndent=9,
    firstLineIndent=-6,
    bulletIndent=0,
    spaceAfter=2.1,
)
COMPACT_BULLET = ParagraphStyle(
    "CompactBullet",
    parent=BULLET,
    fontSize=7.45,
    leading=8.8,
    spaceAfter=1.8,
)
SMALL = ParagraphStyle(
    "Small",
    parent=BODY,
    fontSize=7.6,
    leading=9,
)


def text(value: str, style: ParagraphStyle = BODY) -> Paragraph:
    return Paragraph(value, style)


def bullet(value: str, style: ParagraphStyle = BULLET) -> Paragraph:
    return Paragraph(value, style, bulletText="•")


def section(title: str) -> list:
    return [
        Paragraph(title.upper(), SECTION),
        HRFlowable(width="100%", thickness=1.5, color=INK, spaceBefore=1, spaceAfter=4),
    ]


def rule() -> HRFlowable:
    return HRFlowable(
        width="100%",
        thickness=0.55,
        color=colors.HexColor("#C9C9CF"),
        dash=(2, 2),
        spaceBefore=4,
        spaceAfter=4,
    )


def build_resume() -> None:
    page_width, page_height = A4
    margin = 14 * mm
    header_height = 27 * mm
    column_gap = 10 * mm
    column_width = (page_width - (2 * margin) - column_gap) / 2
    content_height = page_height - (2 * margin) - header_height

    header = Frame(
        margin,
        page_height - margin - header_height,
        page_width - (2 * margin),
        header_height,
        leftPadding=0,
        rightPadding=0,
        topPadding=0,
        bottomPadding=0,
        id="header",
    )
    left = Frame(
        margin,
        margin,
        column_width,
        content_height,
        leftPadding=0,
        rightPadding=0,
        topPadding=0,
        bottomPadding=0,
        id="left",
    )
    right = Frame(
        margin + column_width + column_gap,
        margin,
        column_width,
        content_height,
        leftPadding=0,
        rightPadding=0,
        topPadding=0,
        bottomPadding=0,
        id="right",
    )

    document = BaseDocTemplate(
        str(OUTPUT),
        pagesize=A4,
        leftMargin=margin,
        rightMargin=margin,
        topMargin=margin,
        bottomMargin=margin,
        title="Chirag Aparadh Resume",
        author="Chirag Aparadh",
        subject="Software engineering resume",
    )
    document.addPageTemplates([PageTemplate(id="resume", frames=[header, left, right])])

    story = [
        Paragraph("CHIRAG APARADH", TITLE),
        Paragraph("Software Engineer | Backend | Distributed Systems | AI", SUBTITLE),
        Paragraph(
            '<link href="mailto:chiragaparadh@gmail.com" color="#704399">chiragaparadh@gmail.com</link>'
            '  |  Mumbai, India  |  '
            '<link href="https://github.com/git-chirag" color="#704399">github.com/git-chirag</link>'
            '  |  <link href="https://linkedin.com/in/chirag-aparadh" color="#704399">linkedin.com/in/chirag-aparadh</link>'
            '  |  <link href="https://chirag-aparadh.vercel.app" color="#704399">Portfolio</link>',
            CONTACT,
        ),
        FrameBreak(),
    ]

    story += section("Experience")
    story += [
        text("Software Engineer (Associate Consultant)", ROLE),
        text("Oracle Financial Services Software", COMPANY),
        text("Jul 2023 - Aug 2026 | Mumbai, India", META),
        bullet(
            "Built and maintained core <b>Java EE microservices</b> powering HDFC Bank's net banking platform for <b>2M+ daily active users</b>, sustaining <b>99.99% uptime</b> through highly available clustered deployments."
        ),
        bullet(
            "Implemented a <b>BioCatch bot-detection workflow</b> for merchant transactions, triggering OTP-based authentication for suspicious activity and strengthening fraud prevention across <b>150K daily transactions</b>."
        ),
        bullet(
            "Built event-driven integrations with <b>Apache Kafka</b> to publish acknowledgements to external broker systems after successful fund transfers."
        ),
        bullet(
            "Modernized a legacy banking workflow by translating UI-driven business logic into validated backend service APIs and standardized data contracts."
        ),
        text("<b>Technologies:</b> Java, Java EE, JavaScript, SQL, Oracle Database, Apache Kafka, Microservices, IBM WebSphere", SMALL),
        rule(),
        text("Machine Learning Engineer - Intern", ROLE),
        text("TechCiti", COMPANY),
        text("Aug 2021 - Sep 2021 | Remote", META),
        bullet(
            "Designed a loan-eligibility product using age, loan amount, credit score, location, and employment data."
        ),
        bullet(
            "Trained a logistic regression model with <b>92% test accuracy</b> and built authentication, profile, and prediction modules."
        ),
        text("<b>Technologies:</b> Python, NumPy, Pandas, Scikit-learn", SMALL),
    ]

    story += section("Education")
    story += [
        text("M.S. in Computer Science", ROLE),
        text("University of Massachusetts Amherst", COMPANY),
        text("Currently attending | Aug 2026 - May 2028 (Expected) | Amherst, MA", META),
        Spacer(1, 2),
        text("B.Tech in Computer Science and Engineering", ROLE),
        text("Ramrao Adik Institute of Technology", COMPANY),
        text("Mumbai University, 2023 | CGPA: 9.51 / 10", META),
    ]

    story += section("Achievements")
    story += [
        bullet("Finalist in the <b>Meta x Hugging Face OpenEnv Hackathon</b>, reaching the national finale among <b>31,000+ registered teams</b>."),
        bullet("Ranked <b>1108 globally</b> in LeetCode Biweekly Contest 145 and earned the Knight badge."),
        bullet("Earned a <b>5-Star Gold Badge</b> in Problem Solving on HackerRank."),
        bullet("Cleared <b>GATE CS 2023</b> with AIR 2816 among 75,680 candidates."),
    ]

    story += section("Interests")
    story += [text("Competitive programming, chess, weight training, AI systems", SMALL), FrameBreak()]

    story += section("Technical Skills")
    story += [
        bullet("<b>Languages:</b> Java, Python, C, JavaScript, SQL", COMPACT_BULLET),
        bullet("<b>Backend:</b> Java EE, FastAPI, Django, React, REST APIs, Microservices, Apache Kafka, Redis", COMPACT_BULLET),
        bullet("<b>Data and Cloud:</b> Oracle Database, MySQL, MongoDB, Qdrant, AWS, Docker, Kubernetes, ECS, ECR, Jenkins, Linux", COMPACT_BULLET),
        bullet("<b>AI and Core CS:</b> PyTorch, CLIP, NumPy, Pandas, Scikit-learn, Distributed Systems, DSA, OOP, Operating Systems, Networks", COMPACT_BULLET),
    ]

    story += section("Coding Profiles")
    story += [
        text("<b>LeetCode:</b> eLeet_chirag | Rating: 1866", SMALL),
        text("<b>HackerRank:</b> chiragaparadh", SMALL),
    ]

    story += section("Projects")
    story += [
        text("JiraRL - Stateful RL Environment for LLM Agents", ROLE),
        bullet(
            "Built a stateful, OpenEnv-compatible Jira workflow simulator with structured agent actions, isolated episodes, dependency constraints, deterministic task generation, and executable reward functions.",
            COMPACT_BULLET,
        ),
        bullet(
            "Generated and validated <b>3,500 hint-free procedural training decisions</b> with disjoint train, validation, and test seeds, publishing reproducible datasets and model adapters to Hugging Face.",
            COMPACT_BULLET,
        ),
        bullet(
            "Fine-tuned <b>Qwen3-0.6B using 4-bit QLoRA</b>, achieving <b>100% completion</b> across 60 held-out in-distribution workflow episodes, with <b>500/500 productive transitions</b> and zero invalid actions.",
            COMPACT_BULLET,
        ),
        bullet(
            "Implemented environment-backed <b>GRPO</b> with checkpoint recovery, balanced rewards, neutral rollouts, behavioral audits, and automated promotion gates.",
            COMPACT_BULLET,
        ),
        bullet(
            "Diagnosed action collapse and zero-gradient RL optimization using raw trajectories, candidate reward variance, entropy, and gradient statistics; currently extending evaluation to out-of-distribution workflows and recovery states.",
            COMPACT_BULLET,
        ),
        text("<b>Technologies:</b> Python, FastAPI, OpenEnv, Qwen3, QLoRA, GRPO, Hugging Face", SMALL),
        rule(),
        text("Multimodal Image Search System", ROLE),
        bullet("Built an asynchronous FastAPI and Celery pipeline that generates CLIP embeddings for semantic and visual image retrieval.", COMPACT_BULLET),
        bullet("Indexed vectors in Qdrant and coordinated distributed processing through Redis workers and Amazon S3.", COMPACT_BULLET),
        bullet("Containerized and deployed the application with Docker, AWS ECR, and Amazon ECS.", COMPACT_BULLET),
        text("<b>Technologies:</b> FastAPI, PyTorch, CLIP, Qdrant, Redis, Celery, AWS, Docker", SMALL),
        rule(),
        text("Supply Chain Management Using Blockchain", ROLE),
        bullet("Built a role-aware Ethereum application for transparent product listings, bidding, purchasing, and traceability across the supply chain.", COMPACT_BULLET),
        bullet("Implemented 13 smart-contract functions covering producer, distributor, retailer, and customer workflows.", COMPACT_BULLET),
        text("<b>Technologies:</b> Ethereum, Solidity, React, Tailwind", SMALL),
    ]

    story += section("Publication")
    story += [
        bullet("<b>Exploring the Role of Blockchain in Enhancing Supply Chain</b> (IEEE, Sep 2023)", COMPACT_BULLET)
    ]

    document.build(story)


if __name__ == "__main__":
    build_resume()
