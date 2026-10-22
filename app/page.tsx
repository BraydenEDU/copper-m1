import Image from "next/image";
import Link from "next/link";
import { CheckIcon, XIcon } from "lucide-react";
import { SiteFooter } from "@/components/copper/site-footer";
import { SiteHeader } from "@/components/copper/site-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  formatMemory,
  formatNotesHours,
  formatUsd,
  getPlans,
  getPrivacySummary,
  getProducts,
} from "@/lib/copper/catalog";

const LIFESTYLE_ALT: Record<string, string> = {
  "copper-home-desert-light":
    "Copper Home smart speaker on a shelf in warm desert light",
  "copper-notes-stone-desk":
    "Copper Notes clip-on recorder resting on a stone desk",
  "copper-notes-golden-hour":
    "Copper Notes recorder clipped on in golden-hour light",
};

const LIFESTYLE_CAPTION: Record<string, string> = {
  "copper-home-desert-light":
    "Copper Home keeps the house running, rain or shine.",
  "copper-notes-stone-desk":
    "Copper Notes turns every meeting into clear next steps.",
  "copper-notes-golden-hour": "Take Copper Notes anywhere the day takes you.",
};

const lifestyleKey = (path: string) =>
  path.split("/").pop()!.replace(".png", "");

export default function Home() {
  const products = getProducts();
  const plans = getPlans();
  const privacy = getPrivacySummary();
  const free = plans.find((p) => p.id === "free")!;
  const plus = plans.find((p) => p.id === "copper-plus")!;

  const showcase = products.flatMap((product) =>
    product.lifestyle.map((src) => ({ product, src })),
  );

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section
          id="top"
          data-testid="hero"
          className="bg-secondary text-secondary-foreground"
        >
          <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 md:grid-cols-2 md:py-20">
            <div className="flex flex-col items-start gap-6">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Meet Copper: Your Arizona-Made AI Companions
              </h1>
              <p className="text-xl">From raw ideas to refined answers.</p>
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground"
              >
                <a href="#products">See products</a>
              </Button>
            </div>
            <div className="grid grid-cols-2 items-end gap-2">
              {products.map((product) => (
                <Image
                  key={product.id}
                  src={product.cutout}
                  alt={`${product.name} ${product.type}`}
                  width={1254}
                  height={1254}
                  priority
                  sizes="(min-width: 768px) 25vw, 45vw"
                  className="h-auto w-full"
                />
              ))}
            </div>
          </div>
        </section>

        <section
          id="products"
          data-testid="products"
          className="mx-auto max-w-6xl scroll-mt-16 px-4 py-16"
        >
          <h2 className="mb-8 text-3xl font-bold">Our products</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {products.map((product) => (
              <Card
                key={product.id}
                data-testid="product-card"
                data-product={product.id}
              >
                <CardHeader>
                  <Image
                    src={product.cutout}
                    alt={`${product.name} ${product.type}`}
                    width={1254}
                    height={1254}
                    sizes="(min-width: 768px) 40vw, 90vw"
                    className="mx-auto h-auto w-full max-w-xs"
                  />
                  <CardTitle className="flex flex-wrap items-baseline justify-between gap-2 text-2xl">
                    <span>{product.name}</span>
                    <span className="text-primary">
                      {formatUsd(product.priceUsd)}
                    </span>
                  </CardTitle>
                  <p className="text-muted-foreground">{product.type}</p>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <ul className="flex flex-col gap-3">
                    {product.features.map((feature) => (
                      <li key={feature.name}>
                        <p className="font-semibold">{feature.name}</p>
                        <p className="text-muted-foreground text-sm">
                          {feature.description}
                        </p>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <Badge key={color} variant="secondary">
                        {color}
                      </Badge>
                    ))}
                  </div>
                  <Button asChild variant="outline">
                    <Link href={`/products/${product.id}`}>View details</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section
          id="showcase"
          data-testid="showcase"
          className="bg-muted text-foreground"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 py-16">
            <h2 className="text-3xl font-bold">Made for life in Arizona</h2>
            {showcase.map(({ src }, index) => {
              const key = lifestyleKey(src);
              return (
                <figure
                  key={src}
                  className={`grid items-center gap-6 md:grid-cols-2 ${
                    index % 2 ? "md:[&>div]:order-2" : ""
                  }`}
                >
                  <div className="overflow-hidden rounded-xl">
                    <Image
                      src={src}
                      alt={
                        LIFESTYLE_ALT[key] ??
                        "Copper product in an Arizona setting"
                      }
                      width={1672}
                      height={941}
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="h-auto w-full"
                    />
                  </div>
                  <figcaption className="text-xl font-medium">
                    {LIFESTYLE_CAPTION[key] ?? "Copper, at home in Arizona."}
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </section>

        <section
          id="plus"
          data-testid="plus-pricing"
          className="mx-auto max-w-6xl scroll-mt-16 px-4 py-16"
        >
          <h2 className="mb-2 text-3xl font-bold">Upgrade with Copper Plus</h2>
          <p className="text-muted-foreground mb-8">
            Longer memory, unlimited notes and refined answers.
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            {[free, plus].map((plan) => {
              const isPlus = plan.id === "copper-plus";
              return (
                <Card
                  key={plan.id}
                  className={
                    isPlus
                      ? "bg-primary text-primary-foreground ring-primary"
                      : ""
                  }
                >
                  <CardHeader>
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <p className="text-3xl font-bold">
                      {formatUsd(plan.monthlyUsd)}
                      <span className="text-base font-normal">/month</span>
                    </p>
                    {isPlus && (
                      <p className="text-sm">
                        or {formatUsd(plan.annualUsd)}/year
                      </p>
                    )}
                  </CardHeader>
                  <CardContent>
                    <ul className="flex flex-col gap-2">
                      <li className="flex gap-2">
                        <CheckIcon className="mt-1 size-4 shrink-0" />
                        Memory kept: {formatMemory(plan.memoryDays)}
                      </li>
                      <li className="flex gap-2">
                        <CheckIcon className="mt-1 size-4 shrink-0" />
                        Notes recording:{" "}
                        {formatNotesHours(plan.notesHoursPerMonth)}
                      </li>
                      <li className="flex gap-2">
                        {plan.refinedAnswers ? (
                          <CheckIcon className="mt-1 size-4 shrink-0" />
                        ) : (
                          <XIcon className="mt-1 size-4 shrink-0" />
                        )}
                        Refined answers
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        <section
          id="privacy"
          data-testid="privacy-summary"
          className="bg-accent text-accent-foreground scroll-mt-16"
        >
          <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-16 md:grid-cols-[1fr_auto]">
            <div>
              <h2 className="mb-2 text-3xl font-bold">Your privacy, plainly</h2>
              <p className="mb-6">
                How Copper handles your recordings under our {privacy.policy}{" "}
                policy.
              </p>
              <ul className="flex list-disc flex-col gap-3 pl-5">
                {privacy.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
            <Image
              src="/assets/brand/copper-mascot.png"
              alt="Copper, the friendly robot mascot"
              width={1254}
              height={1254}
              sizes="240px"
              className="mx-auto hidden h-auto w-60 md:block"
            />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
