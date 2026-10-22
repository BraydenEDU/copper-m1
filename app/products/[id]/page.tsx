import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
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
  getProducts,
} from "@/lib/copper/catalog";

export function generateStaticParams() {
  return getProducts().map((product) => ({ id: product.id }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProducts().find((p) => p.id === id);
  if (!product) notFound();

  const plans = getPlans();
  const isHome = product.id === "copper-home";
  const planDetail = (plan: (typeof plans)[number]) =>
    isHome
      ? `Memory kept: ${formatMemory(plan.memoryDays)}`
      : `Notes recording: ${formatNotesHours(plan.notesHoursPerMonth)}`;

  return (
    <>
      <SiteHeader />
      <main data-testid="product-detail" className="flex-1">
        <section className="bg-secondary text-secondary-foreground">
          <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 md:grid-cols-2">
            <div className="flex flex-col items-start gap-4">
              <Link href="/#products" className="hover:text-primary text-sm underline">
                ← All products
              </Link>
              <h1 className="text-4xl font-bold tracking-tight">{product.name}</h1>
              <p className="text-xl">{product.type}</p>
              <p className="text-primary text-3xl font-bold">
                {formatUsd(product.priceUsd)}
              </p>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <Badge key={color} variant="secondary">
                    {color}
                  </Badge>
                ))}
              </div>
            </div>
            <Image
              src={product.cutout}
              alt={`${product.name} ${product.type}`}
              width={1254}
              height={1254}
              priority
              sizes="(min-width: 768px) 50vw, 90vw"
              className="mx-auto h-auto w-full max-w-md"
            />
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="mb-8 text-3xl font-bold">Features</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {product.features.map((feature) => (
              <Card key={feature.name}>
                <CardHeader>
                  <CardTitle>{feature.name}</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  {feature.description}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="bg-muted">
          <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-16">
            <h2 className="text-3xl font-bold">In the real world</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {product.lifestyle.map((src) => (
                <div key={src} className="overflow-hidden rounded-xl">
                  <Image
                    src={src}
                    alt={`${product.name} in an Arizona setting`}
                    width={1672}
                    height={941}
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="h-auto w-full"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="mb-8 text-3xl font-bold">Free or Copper Plus</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {plans.map((plan) => (
              <Card key={plan.id}>
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                </CardHeader>
                <CardContent>{planDetail(plan)}</CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button asChild className="bg-primary text-primary-foreground">
              <Link href="/#plus">See Copper Plus pricing</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/#privacy">Read our privacy policy</Link>
            </Button>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
