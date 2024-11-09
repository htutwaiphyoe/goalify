import { ReactNode } from "react";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type Props = AccordionProps & {
  question: ReactNode;
};

function Accordion({ question, children }: Props) {
  return (
    <MuiAccordion
      classes={{
        root: "!rounded-xl !shadow-sm !bg-primary-lighter !py-3 !border-gray-200 !border",
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="accordion-content"
        id="accordion-header"
      >
        {question}
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </MuiAccordion>
  );
}

export default Accordion;
