import '@fontsource/gudea/latin-400.css';
import '@fontsource/gulzar/latin-400.css';
import '@fontsource/gurajada/latin-400.css';
import '@fontsource/hurricane/latin-400.css';

import { cn } from 'cn';

import { Reveal } from '@/components/editorial/Reveal';

/**
 * The Pastael case study is the newsletter itself, so this page reproduces its design
 * system — Gulzar/Hurricane/Gudea/Gurajada on burgundy and pink — instead of the site's
 * editorial layout. Fonts load only with this chunk.
 */

const image = (name: string) => `/images/projects/pastael/${name}.webp`;

function Heading({ children, script }: { children: string; script: string }) {
  return (
    <h2 className='text-center font-[Gulzar] text-[clamp(2.25rem,4.4vw,4rem)] leading-[0.95] tracking-[0.05em] text-balance'>
      {children}
      <span className='block font-[Hurricane] text-[1.3em] font-normal tracking-normal'>
        {script}
      </span>
    </h2>
  );
}

function Chip({ children }: { children: string }) {
  return (
    <span className='rounded-[20px] border border-current px-[1.25em] py-[0.7em] font-[Gudea] text-[clamp(0.95rem,1.9vw,1.6rem)] leading-none'>
      {children}
    </span>
  );
}

function Photo({
  src,
  alt,
  width,
  height,
  className,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading='lazy'
      decoding='async'
      className={cn('h-auto w-full', className)}
    />
  );
}

const sizes = [
  { name: 'Small', src: image('size-small'), chips: ['XSmall', 'Small'] },
  { name: 'Medium', src: image('size-medium'), chips: ['Medium', 'Large'] },
  { name: 'Large', src: image('size-large'), chips: ['XLarge', 'XXLarge'] },
];

const colours = [
  { name: 'Espresso', swatch: image('swatch-espresso'), src: image('colour-espresso') },
  { name: 'Green Apple', swatch: image('swatch-green-apple'), src: image('colour-green-apple') },
  { name: 'Citron', swatch: image('swatch-citron'), src: image('colour-citron') },
];

function PastaelShowcase() {
  return (
    <div className='bg-white text-[#642e2c]'>
      {/* Compressible packing cubes */}
      <section className='grid md:grid-cols-2'>
        <Photo
          src={image('fabric-detail')}
          alt='Close-up of the striped cherry fabric'
          width={931}
          height={895}
          className='h-full object-cover'
        />
        <Photo
          src={image('suitcase')}
          alt='Packing cubes organised inside a suitcase'
          width={797}
          height={1024}
          className='h-full object-cover'
        />
      </section>
      <section className='mx-auto max-w-6xl px-gutter py-[clamp(3rem,7vw,6rem)]'>
        <Reveal className='max-w-[42rem]'>
          <h2 className='font-[Gulzar] text-[clamp(2.25rem,4.4vw,4rem)] leading-[0.95] tracking-[0.05em] text-balance'>
            COMPRESSIBLE PACKING CUBES
          </h2>
          <p className='mt-8 max-w-[68ch] font-[Gulzar] text-[0.85rem] leading-[1.7] tracking-[0.05em]'>
            Say bye to overfilled suitcases and desperately searching through unorganised clothes at
            security. Our packing cubes are designed to be as bright and colourful as your travel
            plans, while allowing your clothes to stay neatly packed and organised inside. Each
            Pastael packing cube also comes with a compressible zipper, helping you compress bulky
            fabrics to save space in your luggage. Each packing set comes in a set of 2.
          </p>
        </Reveal>
      </section>

      {/* Size collections */}
      <section className='px-gutter py-[clamp(2rem,5vw,4rem)]'>
        <Reveal>
          <Heading script='Size Collections'>PACKING CUBES</Heading>
        </Reveal>
        <div className='mx-auto mt-[clamp(2.5rem,5vw,4.5rem)] grid max-w-6xl gap-x-8 gap-y-14 sm:grid-cols-3'>
          {sizes.map((size, index) => (
            <Reveal key={size.name} delay={index * 0.08} className='flex flex-col items-center'>
              <Photo
                src={size.src}
                alt={`${size.name} packing cube set`}
                width={424}
                height={567}
              />
              <p className='font-[Gulzar] text-[clamp(2rem,3.6vw,3.25rem)] tracking-[-0.03em]'>
                {size.name}
              </p>
              <div className='mt-6 flex gap-4'>
                {size.chips.map((chip) => (
                  <Chip key={chip}>{chip}</Chip>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Product detail */}
      <section className='mx-auto grid max-w-6xl items-center gap-x-14 gap-y-10 px-gutter py-[clamp(3rem,7vw,6rem)] md:grid-cols-2'>
        <Reveal className='flex flex-col items-center gap-8'>
          <Heading script='Small'>PACKING CUBE</Heading>
          <div className='flex gap-4'>
            <Chip>XSmall</Chip>
            <Chip>Small</Chip>
          </div>
          <p className='max-w-[42ch] text-center font-[Gulzar] text-[0.85rem] leading-[1.7] tracking-[0.05em]'>
            Our small packing cubes set is designed to organise smaller items like underwear,
            swimwear, T-shirts and shorts.
          </p>
          <Photo
            src={image('dimensions')}
            alt='Dimension diagram: 26 by 21 centimeters and 26 by 10 centimeters, £40.00'
            width={1026}
            height={1105}
            className='max-w-[26rem]'
          />
        </Reveal>
        <Reveal delay={0.1}>
          <Photo
            src={image('detail-cubes')}
            alt='Open small packing cubes showing the striped lining'
            width={675}
            height={900}
          />
        </Reveal>
      </section>

      {/* Collage */}
      <section className='grid gap-[3px] md:grid-cols-2'>
        <div className='grid gap-[3px]'>
          <Photo
            src={image('collage-01')}
            alt='Packing cube pair on pink'
            width={603}
            height={644}
            className='h-full object-cover'
          />
          <Photo
            src={image('collage-02')}
            alt='Stacked packing cubes'
            width={564}
            height={584}
            className='h-full object-cover'
          />
        </div>
        <Photo
          src={image('collage-03')}
          alt='Packing cube standing upright in a suitcase'
          width={713}
          height={1035}
          className='h-full object-cover'
        />
      </section>

      {/* Color collections */}
      <section className='px-gutter py-[clamp(3rem,7vw,6rem)]'>
        <Reveal>
          <Heading script='Color Collections'>PACKING CUBES</Heading>
        </Reveal>
        <div className='mx-auto mt-[clamp(2.5rem,5vw,4.5rem)] grid max-w-6xl gap-x-8 gap-y-14 sm:grid-cols-3'>
          {colours.map((colour, index) => (
            <Reveal key={colour.name} delay={index * 0.08} className='flex flex-col items-center'>
              <img
                src={colour.swatch}
                alt=''
                width={141}
                height={142}
                loading='lazy'
                className='w-[clamp(4.5rem,8vw,8rem)]'
              />
              <p className='mt-8 font-[Gulzar] text-[clamp(2rem,3.6vw,3.25rem)] tracking-[-0.03em] whitespace-nowrap'>
                {colour.name}
              </p>
              <Photo
                src={colour.src}
                alt={`${colour.name} colour collection`}
                width={414}
                height={489}
                className='mt-10'
              />
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}

export { PastaelShowcase };
