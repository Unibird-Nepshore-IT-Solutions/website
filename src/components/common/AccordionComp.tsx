import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface AccordionCompProps {
  id: number;
  label: string;
  value: string;
}

export const AccordionComp = ({ faqs }: { faqs: AccordionCompProps[] }) => {
  return (
    <div className="size-full">
      {faqs.map((faq) => (
        <Accordion
          collapsible
          key={faq.id}
          type="single"
          defaultValue={faqs[0].label}
          className="bg-background w-full"
        >
          <AccordionItem
            value={faq.label}
            className="mb-4 data-[state=open]:border data-[state=open]:border-secondary-dark"
          >
            <AccordionTrigger className="font-semibold px-6 text-base hover:no-underline data-[state=open]:text-secondary">
              {faq.label}
            </AccordionTrigger>
            <AccordionContent className="px-6 text-base text-secondary">
              {faq.value}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
};
