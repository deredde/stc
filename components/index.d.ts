import type * as React from 'react';

// ---------- base
export declare const cx: (...a: unknown[]) => string;
/** Valore controllato o interno, come gli input nativi. */
export declare function useControllable<T>(value: T | undefined, defaultValue: T, onChange?: (v: T) => void): [T, (v: T) => void];
export declare const ridotto: () => boolean;
/** Larghezza di un elemento, aggiornata quando cambia (per i layout che si adattano al contenitore). */
export declare function useWidth<T extends HTMLElement>(ref: React.RefObject<T | null>, fallback?: number): any;
export interface IconProps {
    name: string;
    size?: number;
    className?: string;
    style?: React.CSSProperties;
    title?: string;
    strokeWidth?: number;
}
/** Un'icona Lucide per nome (tratto 1,5 su 24, colore dal testo). */
export declare function Icon({ name, size, className, style, title, strokeWidth }: IconProps): any;
export declare const iconNames: () => string[];
export declare function Spinner({ size }: {
    size?: number;
}): any;
/** Un tasto scritto: «/», «Esc», «↵». */
export declare function Kbd({ children, className }: {
    children: React.ReactNode;
    className?: string;
}): any;
/** Testo solo per lo screen reader. */
export declare function VisuallyHidden({ children }: {
    children: React.ReactNode;
}): any;
export declare function temaDi(el: Element | null | undefined): string | undefined;
/** Porta un overlay nel body, portandosi dietro il tema del punto da cui parte. */
export declare function Portal({ children, from }: {
    children: React.ReactNode;
    from?: React.RefObject<Element | null>;
}): any;
/** Tiene montato un overlay il tempo dell'animazione d'uscita. state: open | closed. */
export declare function usePresence(open: boolean, ms?: number): {
    readonly mounted: any;
    readonly state: "open" | "closed";
};
export declare function useDismiss(open: boolean, refs: React.RefObject<HTMLElement | null>[], onClose: () => void, opts?: {
    outside?: boolean;
    escape?: boolean;
}): void;
export type Placement = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end' | 'right-start';
export declare function useAnchor(anchor: React.RefObject<HTMLElement | null>, open: boolean, opts?: {
    placement?: Placement;
    offset?: number;
    width?: number | 'anchor';
    height?: number;
}): any;
/** Il fuoco entra nel pannello all'apertura e torna dove era alla chiusura. */
export declare function useFocusReturn(open: boolean, panel: React.RefObject<HTMLElement | null>, first?: string): void;
/** Tiene la Tab dentro il pannello modale. */
export declare function trapTab(e: React.KeyboardEvent<HTMLElement>): void;
/** Pannello ancorato in vetro: tendine, menu, calendari. */
export interface PopoverProps {
    open: boolean;
    onClose: () => void;
    anchor: React.RefObject<HTMLElement | null>;
    children: React.ReactNode;
    placement?: Placement;
    width?: number | 'anchor';
    height?: number;
    className?: string;
    role?: string;
    label?: string;
    padding?: number | string;
    style?: React.CSSProperties;
    panelRef?: React.RefObject<HTMLDivElement | null>;
    id?: string;
}
export declare function Popover({ open, onClose, anchor, children, placement, width, height, className, role, label, padding, style, panelRef, id }: PopoverProps): any;
export interface FieldState {
    id?: string;
    describedBy?: string;
    invalid?: boolean;
    disabled?: boolean;
    required?: boolean;
}
export declare const FieldCtx: any;
export declare const useField: () => any;
/** Navigazione con le frecce in una lista di opzioni. */
export declare function useListNav(n: number, open: boolean, start?: number): {
    active: any;
    setActive: any;
    onKey: (e: React.KeyboardEvent | KeyboardEvent, scegli: (i: number) => void) => boolean;
};

// ---------- azioni
export type Size = 'row' | 'card' | 'form' | 'header';
export type Tone = 'success' | 'danger' | 'warning' | 'info' | 'neutral';
export declare const TONE_ICON: Record<Tone, string>;
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** primary: l'azione della vista (una sola). secondary: il resto. tertiary: azioni leggere. accent: richiamo. danger: distruttive. */
    variant?: 'primary' | 'secondary' | 'tertiary' | 'accent' | 'danger';
    /** row 30 · card 32 · form 40 · header 44. Al tocco tutto sale a 44. */
    size?: Size;
    icon?: string;
    iconRight?: string;
    /** Mostra la rotella e blocca il bottone; scrivi l'etichetta al gerundio («Incasso…»). */
    loading?: boolean;
    full?: boolean;
}
export declare const Button: any;
export interface IconButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
    icon: string;
    /** Obbligatoria: è ciò che legge lo screen reader e il tooltip. */
    label: string;
    variant?: 'ghost' | 'outline' | 'primary' | 'accent';
    size?: Size;
    /** Contatore in alto a destra (filtri attivi). */
    badge?: number | string;
}
export declare const IconButton: any;
/** Link d'azione nel testo e nelle card: «Apri», «Tutti i pacchetti», «Azzera». */
export declare function TextLink({ children, className, tone, ...rest }: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    tone?: 'default' | 'danger' | 'muted';
}): any;
export interface BadgeProps {
    tone?: Tone | 'accent';
    children: React.ReactNode; /** true: icona dello stato; stringa: un'icona a scelta; false: niente. */
    icon?: boolean | string;
    size?: 'md' | 'sm';
    className?: string;
}
/** Stato di qualcosa: tinta, bordo e icona. Mai solo il colore. */
export declare function Badge({ tone, children, icon, size, className }: BadgeProps): any;
export interface CountProps {
    value: number | string;
    tone?: 'primary' | 'muted' | 'danger' | 'accent';
    max?: number;
    className?: string;
    label?: string;
}
/** Contatore: solo su ciò che aspetta un'azione. */
export declare function Count({ value, tone, max, className, label }: CountProps): any;
export interface ChipProps {
    children: React.ReactNode;
    selected?: boolean;
    onClick?: () => void; /** Con onRemove diventa il filtro applicato, grigio con la ×. */
    onRemove?: () => void;
    prefix?: string;
    className?: string;
    disabled?: boolean;
}
export declare function Chip({ children, selected, onClick, onRemove, prefix, className, disabled }: ChipProps): any;
export interface AvatarProps {
    name?: string;
    initials?: string;
    src?: string;
    size?: 24 | 32 | 36 | 40 | 48 | 56 | 80;
    className?: string;
    dot?: Tone;
}
export declare const iniziali: (n?: string) => string;
export declare function Avatar({ name, initials, src, size, className, dot }: AvatarProps): any;
export declare function AvatarAdd({ label, onClick, size }: {
    label?: string;
    onClick?: () => void;
    size?: number;
}): any;
export interface AlertProps {
    tone?: Tone;
    title: React.ReactNode;
    children?: React.ReactNode;
    action?: React.ReactNode;
    icon?: string;
    className?: string;
    onClose?: () => void;
}
/** Avviso dentro la pagina: titolo, una frase, al massimo un'azione. */
export declare function Alert({ tone, title, children, action, icon, className, onClose }: AlertProps): any;
export interface BannerProps {
    tone?: Tone;
    title: React.ReactNode;
    children?: React.ReactNode;
    action?: {
        label: string;
        onClick?: () => void;
        icon?: string;
    };
    icon?: string;
    className?: string;
}
/** Fascia in cima alla pagina per ciò che riguarda tutto il gestionale: rete assente, nuova versione. */
export declare function Banner({ tone, title, children, action, icon, className }: BannerProps): any;
export interface ToastOptions {
    text: React.ReactNode;
    tone?: 'success' | 'danger' | 'info' | 'neutral';
    icon?: string;
    action?: {
        label: string;
        onClick: () => void;
    };
    duration?: number;
}
/** Mostra un toast: const toast = useToast(); toast({ text: 'Ingresso registrato', action: { label: 'Annulla', onClick } }). */
export declare const useToast: () => any;
export declare function ToastProvider({ children, placement }: {
    children: React.ReactNode;
    /** auto di serie: in alto su desktop, in basso sotto i 600 px. */
    placement?: 'auto' | 'top' | 'bottom';
}): any;
export declare function Toast({ text, tone, icon, action, duration, state, onClose, progress }: ToastOptions & {
    state?: 'open' | 'closed';
    onClose?: () => void;
    progress?: boolean;
}): any;
export interface TooltipProps {
    label: React.ReactNode;
    children: React.ReactElement;
    placement?: 'top' | 'right' | 'bottom';
    delay?: number;
    open?: boolean;
}
/** Etichetta scura che compare dopo 400 ms al passaggio o al fuoco. Non metterci informazioni che servono per agire. */
export declare function Tooltip({ label, children, placement, delay, open: forzato }: TooltipProps): any;
export declare function Skeleton({ width, height, radius, circle, className, style }: {
    width?: number | string;
    height?: number | string;
    radius?: number | string;
    circle?: boolean;
    className?: string;
    style?: React.CSSProperties;
}): any;
/** Riga di caricamento come una riga di lista: cerchio e due righe. */
export declare function SkeletonRow(): any;
export interface EmptyStateProps {
    /** Solo per gli spazi bassi: di serie c'è l'illustrazione folder-empty. */
    icon?: string;
    title: React.ReactNode;
    children?: React.ReactNode;
    action?: React.ReactNode;
    size?: 'sm' | 'lg';
    tone?: 'accent' | 'neutral';
    /** Un'illustrazione al posto dell'icona (vedi Illustration). */
    illustration?: IllustrationName;
    /** Misura dell'illustrazione: di serie md in lg, sm in sm. */
    illustrationSize?: 'lg' | 'md' | 'sm' | 'xs' | number;
    /** Movimento dell'illustrazione: true di serie, "hover", false. */
    animated?: boolean | 'hover';
    className?: string;
}
/** Cosa manca, perché, e l'azione che lo risolve. */
export declare function EmptyState({ icon, title, children, action, size, tone, className }: EmptyStateProps): any;
export declare function ProgressBar({ value, label, tone }: {
    value: number;
    label?: string;
    tone?: 'primary' | 'accent' | 'success' | 'danger';
}): any;
export declare function FileProgress({ name, value, onCancel, icon }: {
    name: string;
    value: number;
    onCancel?: () => void;
    icon?: string;
}): any;

// ---------- form
export interface FieldProps {
    label?: React.ReactNode;
    help?: React.ReactNode;
    error?: React.ReactNode;
    optional?: boolean;
    required?: boolean;
    counter?: {
        value: number;
        max: number;
    };
    children: React.ReactNode;
    className?: string;
    id?: string;
    disabled?: boolean; /** Etichetta accanto (per interruttori e caselle) invece che sopra. */
    inline?: boolean;
}
export declare function Field({ label, help, error, optional, required, counter, children, className, id, disabled, inline }: FieldProps): any;
export interface TextInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
    size?: 'card' | 'form' | 'header';
    /** Icona a sinistra (es. search). */
    icon?: string;
    /** Prima del testo, separato da una linea: «+39». */
    prefix?: React.ReactNode;
    /** Unità dopo il testo: «€», «kg». */
    suffix?: React.ReactNode;
    /** Cifre in mono e allineate a destra (importi, quantità). */
    numeric?: boolean;
    invalid?: boolean;
    onValue?: (v: string) => void;
}
export declare const TextInput: any;
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    invalid?: boolean;
    onValue?: (v: string) => void;
    rows?: number;
}
export declare const Textarea: any;
export interface SearchInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'> {
    value: string;
    onChange: (v: string) => void;
    size?: 'card' | 'header';
    shortcut?: string;
    width?: number | string;
}
/** Ricerca di pagina (44) o dentro una card (32). Con la × per svuotare e il tasto scritto. */
export declare const SearchInput: any;
export interface Option {
    value: string;
    label: string;
    description?: string;
    disabled?: boolean;
    icon?: string;
}
export interface SelectProps {
    value?: string;
    defaultValue?: string;
    onChange?: (v: string) => void;
    options: Option[];
    placeholder?: string;
    size?: 'card' | 'form';
    disabled?: boolean;
    invalid?: boolean;
    id?: string;
    className?: string;
    label?: string; /** Campo di ricerca nella lista: di serie oltre le 8 voci. */
    searchable?: boolean;
    defaultOpen?: boolean;
    width?: number | string;
}
/** Tendina di scelta singola, disegnata: tastiera, ricerca, vetro. */
export declare function Select({ value, defaultValue, onChange, options, placeholder, size, disabled, invalid, id, className, label, searchable, defaultOpen, width }: SelectProps): any;
export interface FilterOption {
    value: string;
    label: string;
    count?: number;
    dot?: 'success' | 'danger' | 'warning' | 'info' | 'neutral';
}
export interface FilterMenuProps {
    label: string;
    options: FilterOption[];
    value: string | string[];
    onChange: (v: any) => void;
    multiple?: boolean;
    note?: React.ReactNode;
    allLabel?: string;
    defaultOpen?: boolean;
    size?: 'card' | 'form';
}
/** Bottone di filtro della barra sopra una lista. Attivo: bordo d'inchiostro e il numero dei valori scelti. */
export declare function FilterMenu({ label, options, value, onChange, multiple, note, allLabel, defaultOpen, size }: FilterMenuProps): any;
export interface CheckboxProps {
    checked?: boolean;
    defaultChecked?: boolean;
    indeterminate?: boolean;
    onChange?: (v: boolean) => void;
    label?: React.ReactNode;
    description?: React.ReactNode;
    disabled?: boolean;
    id?: string;
    className?: string;
    'aria-label'?: string;
}
export declare function Checkbox({ checked, defaultChecked, indeterminate, onChange, label, description, disabled, id, className, ...rest }: CheckboxProps): any;
export interface RadioGroupProps {
    value?: string;
    defaultValue?: string;
    onChange?: (v: string) => void;
    options: Option[];
    name?: string;
    label?: string;
    direction?: 'column' | 'row';
    disabled?: boolean;
}
export declare function RadioGroup({ value, defaultValue, onChange, options, name, label, direction, disabled }: RadioGroupProps): any;
export interface SwitchProps {
    checked?: boolean;
    defaultChecked?: boolean;
    onChange?: (v: boolean) => void;
    label?: React.ReactNode;
    disabled?: boolean;
    size?: 'md' | 'sm';
    id?: string;
    'aria-label'?: string;
}
export declare function Switch({ checked, defaultChecked, onChange, label, disabled, size, id, ...rest }: SwitchProps): any;
/** Una regola che si accende o si spegne, in una card: titolo, una riga di spiegazione, l'interruttore. */
export declare function SettingRow({ title, description, checked, defaultChecked, onChange, disabled, children }: {
    title: React.ReactNode;
    description?: React.ReactNode;
    checked?: boolean;
    defaultChecked?: boolean;
    onChange?: (v: boolean) => void;
    disabled?: boolean;
    children?: React.ReactNode;
}): any;
export interface SegmentedProps {
    value?: string;
    defaultValue?: string;
    onChange?: (v: string) => void;
    options: (Option | string)[];
    full?: boolean;
    size?: 'card' | 'form';
    label?: string;
}
/** Scelta tra 2–4 viste o modi: Oggi · Settimana · Mese. */
export declare function Segmented({ value, defaultValue, onChange, options, full, size, label }: SegmentedProps): any;
export interface QuantitySelectorProps {
    value?: number;
    defaultValue?: number;
    onChange?: (v: number) => void;
    min?: number;
    max?: number;
    step?: number;
    label?: string;
    disabled?: boolean;
}
export declare function QuantitySelector({ value, defaultValue, onChange, min, max, step, label, disabled }: QuantitySelectorProps): any;
export interface FileDropProps {
    title: React.ReactNode;
    text?: React.ReactNode;
    accept?: string;
    multiple?: boolean;
    onFiles: (f: File[]) => void;
    icon?: string;
    camera?: boolean;
    chooseLabel?: string;
}
/** Zona dove trascinare un file, con «Scegli file» e, su telefono, «Scatta foto». */
export declare function FileDrop({ title, text, accept, multiple, onFiles, icon, camera, chooseLabel }: FileDropProps): any;

// ---------- pickers
export declare const MESI: string[];
export declare const GIORNI_BREVI: string[];
export declare const isoDi: (d: Date) => string;
export declare const daIso: (s: string) => Date;
export declare const oggiIso: () => string;
export declare const piuGiorni: (s: string, n: number) => string;
/** «2026-10-20» → «20/10/2026» */
export declare const formatData: (s?: string) => string;
/** «20/10/26», «20.10.2026», «20-10-2026» → «2026-10-20»; null se non è una data. */
export declare function leggiData(t: string): string | null;
interface MeseProps {
    anno: number;
    mese: number;
    scelto?: string;
    da?: string;
    a?: string;
    cursore?: string;
    oggi: string;
    min?: string;
    max?: string;
    onPick: (d: string) => void;
    onHover?: (d: string) => void;
}
/** La griglia di un mese, da lunedì: oggi in pastiglia, scelto pieno, intervallo in banda, fuori limite barrato. */
export declare function MonthGrid({ anno, mese, scelto, da, a, cursore, oggi, min, max, onPick, onHover }: MeseProps): any;
export declare function Shortcut({ on, children, onClick }: {
    on?: boolean;
    children: React.ReactNode;
    onClick: () => void;
}): any;
export interface DatePickerProps {
    value?: string;
    defaultValue?: string;
    onChange?: (iso: string) => void;
    min?: string;
    max?: string;
    placeholder?: string;
    size?: 'card' | 'form';
    disabled?: boolean;
    invalid?: boolean; /** Oggi della demo (di serie la data vera). */
    today?: string;
    shortcuts?: boolean;
    defaultOpen?: boolean;
    id?: string;
    width?: number | string;
}
/** Campo data: si scrive (gg/mm/aaaa) o si sceglie dal calendario, che si apre al fuoco. Frecce per muoversi, Invio per scegliere. */
export declare function DatePicker({ value, defaultValue, onChange, min, max, placeholder, size, disabled, invalid, today, shortcuts, defaultOpen, id, width }: DatePickerProps): any;
export interface Range {
    from: string;
    to: string;
}
export interface DateRangePickerProps {
    value?: Range | null;
    defaultValue?: Range | null;
    onChange?: (r: Range | null) => void;
    presets?: {
        label: string;
        range: Range;
    }[];
    today?: string;
    placeholder?: string;
    size?: 'card' | 'form';
    defaultOpen?: boolean;
    label?: string;
}
/** Periodo: scorciatoie in alto, due clic sul calendario, «Applica». Il bottone mostra il periodo scelto. */
export declare function DateRangePicker({ value, defaultValue, onChange, presets, today, placeholder, size, defaultOpen, label }: DateRangePickerProps): any;
/** «9» → «09:00», «930» → «09:30», «9.5» → «09:05»; null se non è un'ora. */
export declare function leggiOra(t: string): string | null;
export interface TimePickerProps {
    value?: string;
    defaultValue?: string;
    onChange?: (v: string) => void;
    step?: number;
    from?: number;
    to?: number;
    placeholder?: string;
    size?: 'card' | 'form';
    disabled?: boolean;
    defaultOpen?: boolean;
    width?: number | string;
    id?: string;
}
/** Ora: si scrive («930» diventa 09:30) o si sceglie da una lista a passi di 15 minuti. */
export declare function TimePicker({ value, defaultValue, onChange, step, from, to, placeholder, size, disabled, defaultOpen, width, id }: TimePickerProps): any;
export interface TimeRange {
    from: string;
    to: string;
}
export interface TimeRangePickerProps {
    value?: TimeRange | null;
    defaultValue?: TimeRange | null;
    onChange?: (v: TimeRange | null) => void;
    step?: number;
    from?: number;
    to?: number;
    size?: 'card' | 'form';
    defaultOpen?: boolean;
    placeholder?: string;
    width?: number | string;
}
/** Fascia oraria: due colonne «Dalle» e «Alle»; la seconda accetta solo ore dopo la prima. */
export declare function TimeRangePicker({ value, defaultValue, onChange, step, from, to, size, defaultOpen, placeholder, width }: TimeRangePickerProps): any;

// ---------- overlay
export interface MenuItem {
    id: string;
    label: React.ReactNode;
    icon?: string;
    danger?: boolean;
    disabled?: boolean;
    separator?: boolean;
    hint?: React.ReactNode;
    onSelect?: () => void;
}
export interface MenuProps {
    items: MenuItem[]; /** L'elemento che apre il menu: di serie il bottone ⋮ «Altre azioni». */
    trigger?: React.ReactElement;
    label?: string;
    header?: React.ReactNode;
    placement?: Placement;
    width?: number;
    defaultOpen?: boolean;
    onSelect?: (id: string) => void;
}
/** Menu di azioni: al massimo due azioni a vista, le altre qui. L'azione distruttiva va per ultima, separata. */
export declare function Menu({ items, trigger, label, header, placement, width, defaultOpen, onSelect }: MenuProps): any;
export interface DialogProps {
    open: boolean;
    onClose: () => void;
    title: React.ReactNode;
    description?: React.ReactNode;
    icon?: string;
    tone?: Tone | 'accent';
    children?: React.ReactNode;
    footer?: React.ReactNode;
    size?: 'confirm' | 'wide' | 'grid'; /** false: niente chiusura con il clic sul velo (moduli lunghi). */
    dismissible?: boolean;
    className?: string;
}
/** Dialog al centro per confermare o per un modulo breve. Il velo dietro lo chiude, come Esc. */
export declare function Dialog({ open, onClose, title, description, icon, tone, children, footer, size, dismissible, className }: DialogProps): any;
export interface ConfirmDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: React.ReactNode;
    description?: React.ReactNode;
    confirmLabel: string;
    cancelLabel?: string;
    danger?: boolean;
    icon?: string;
    loading?: boolean;
    children?: React.ReactNode;
}
/** Conferma di un'azione: il verbo sul bottone («Annulla abbonamento»), mai «OK» o «Sì». */
export declare function ConfirmDialog({ open, onClose, onConfirm, title, description, confirmLabel, cancelLabel, danger, icon, loading, children }: ConfirmDialogProps): any;
export interface DrawerProps {
    open: boolean;
    onClose: () => void;
    title: React.ReactNode;
    subtitle?: React.ReactNode;
    children: React.ReactNode;
    footer?: React.ReactNode;
    width?: number;
    headerActions?: React.ReactNode;
    dismissible?: boolean;
    className?: string;
}
/** Pannello che entra da destra, staccato dai bordi: si lavora senza lasciare la pagina. Su telefono occupa lo schermo. */
export declare function Drawer({ open, onClose, title, subtitle, children, footer, width, headerActions, dismissible, className }: DrawerProps): any;
export interface SheetProps {
    open: boolean;
    onClose: () => void;
    title?: React.ReactNode;
    description?: React.ReactNode;
    children?: React.ReactNode;
    footer?: React.ReactNode;
    className?: string;
}
/** Foglio dal basso, su telefono: filtri, menu, scelte. La maniglia in cima, il velo chiude. */
export declare function Sheet({ open, onClose, title, description, children, footer, className }: SheetProps): any;

// ---------- nav
export interface TabItem {
    id: string;
    label: React.ReactNode;
    count?: number | string;
    disabled?: boolean;
}
export interface TabsProps {
    items: TabItem[];
    value: string;
    onChange: (id: string) => void;
    variant?: 'page' | 'card';
    label?: string;
    className?: string;
}
/** Tab come Ordinoo: pastiglia d'accento al 10 % sull'attivo, linea che scivola sotto l'etichetta, contatori grigi. */
export declare function Tabs({ items, value, onChange, variant, label, className }: TabsProps): any;
export interface PageHeaderProps {
    title: React.ReactNode;
    subtitle?: React.ReactNode;
    actions?: React.ReactNode;
    back?: {
        label: string;
        onClick?: () => void;
        href?: string;
    };
    avatar?: React.ReactNode;
    badge?: React.ReactNode;
    tabs?: TabsProps;
    className?: string;
}
/** Testata della pagina: titolo, una riga di contesto, al massimo tre comandi a destra (il primario per ultimo). */
export declare function PageHeader({ title, subtitle, actions, back, avatar, badge, tabs, className }: PageHeaderProps): any;
export declare function BackLink({ label, onClick, href }: {
    label: string;
    onClick?: () => void;
    href?: string;
}): any;
export declare function Pagination({ page, pageSize, total, noun, onChange }: {
    page: number;
    pageSize: number;
    total: number;
    noun?: string;
    onChange: (p: number) => void;
}): any;
export interface NavItem {
    id: string;
    label: string;
    icon: string;
    count?: number | string;
    countTone?: 'danger' | 'muted' | 'primary';
    dot?: boolean;
    href?: string;
}
export interface NavSection {
    title?: string;
    items: NavItem[];
}
export interface SwitcherOption {
    value: string;
    label: string;
    count?: number;
}
export interface SidebarProps {
    /** Il nome del prodotto: scritto in carattere display finché il progetto non ha un logo. */
    name: string;
    logo?: React.ReactNode;
    /** Lettera della tessera quando la barra è chiusa. */
    mark?: string;
    status?: React.ReactNode;
    /** Cambio di contesto (sede, azienda, cantiere): resta in cima a tutto. */
    switcher?: {
        value: string;
        options: SwitcherOption[];
        onChange: (v: string) => void;
        title?: string;
        note?: React.ReactNode;
        icon?: string;
    };
    search?: {
        label?: string;
        onClick: () => void;
        shortcut?: string;
    };
    action?: {
        label: string;
        icon?: string;
        onClick: () => void;
    };
    sections: NavSection[];
    active: string;
    onNavigate: (id: string) => void;
    user?: {
        name: string;
        role?: string;
        initials?: string;
        menu?: MenuItem[];
    };
    theme?: {
        value: 'light' | 'dark';
        onToggle: () => void;
    };
    collapsed?: boolean;
    /** Con la barra chiusa: il clic sulla tessera la apre sopra la pagina. */
    onExpand?: () => void;
    className?: string;
}
/** La barra laterale del gestionale: testata di marca con contesto, ricerca e azione principale; sezioni con le voci; chi sei in fondo. */
export declare function Sidebar(p: SidebarProps): any;
export declare function SettingsNav({ items, value, onChange, label }: {
    items: {
        id: string;
        label: string;
        alert?: boolean;
    }[];
    value: string;
    onChange: (id: string) => void;
    label?: string;
}): any;
export interface MobileHeaderProps {
    title: React.ReactNode;
    subtitle?: React.ReactNode;
    mark?: string;
    logo?: React.ReactNode;
    onTitleClick?: () => void;
    actions?: React.ReactNode;
    back?: {
        label: string;
        onClick: () => void;
    };
}
/** Testata da 56 su telefono: tessera del prodotto, titolo della pagina e il contesto sotto (con il cambio, se c'è). */
export declare function MobileHeader({ title, subtitle, mark, logo, onTitleClick, actions, back }: MobileHeaderProps): any;
export interface BottomItem {
    id: string;
    label: string;
    icon: string;
    dot?: boolean; /** La voce al centro, piena d'accento: l'azione che si fa più spesso. */
    primary?: boolean;
}
export declare function BottomNav({ items, value, onChange }: {
    items: BottomItem[];
    value?: string;
    onChange: (id: string) => void;
}): any;
/** Barra dell'app per l'utente finale: icona in una pastiglia piena d'accento sulla voce attiva. */
export declare function AppTabBar({ items, value, onChange }: {
    items: {
        id: string;
        label: string;
        icon: string;
        dot?: boolean;
    }[];
    value: string;
    onChange: (id: string) => void;
}): any;
export interface SearchResult {
    id: string;
    title: string;
    meta?: React.ReactNode;
    initials?: string;
    icon?: string;
    badge?: {
        tone: Tone;
        label: string;
    };
}
export interface CommandSearchProps {
    open: boolean;
    onClose: () => void;
    query: string;
    onQuery: (q: string) => void;
    recent?: SearchResult[];
    results?: SearchResult[];
    onPick: (id: string) => void;
    onCreate?: (q: string) => void;
    createLabel?: (q: string) => string;
    placeholder?: string;
    noun?: string;
    hint?: React.ReactNode;
    recentTitle?: string;
    emptyText?: React.ReactNode;
}
/** Ricerca globale, da ogni pagina con «/»: ultimi aperti quando è vuota, risultati evidenziati, «Crea» quando non trova niente. */
export declare function CommandSearch({ open, onClose, query, onQuery, recent, results, onPick, onCreate, createLabel, placeholder, noun, hint, recentTitle, emptyText }: CommandSearchProps): any;

// ---------- dati
export interface CardProps extends React.HTMLAttributes<HTMLElement> {
    title?: React.ReactNode;
    action?: React.ReactNode; /** Senza interno: per tabelle e liste che arrivano ai bordi. */
    flush?: boolean;
    padding?: 'md' | 'sm' | 'lg';
    as?: 'section' | 'div' | 'article';
    interactive?: boolean;
}
/** Il contenitore di tutto ciò che sta nella pagina. Cliccabile: si solleva di 2px. */
export declare function Card({ title, action, flush, padding, as, interactive, className, children, onClick, ...rest }: CardProps): any;
/** Barra degli strumenti in cima a una card con tabella: tab a sinistra, ricerca e comandi a destra. */
export declare function CardToolbar({ start, end }: {
    start?: React.ReactNode;
    end?: React.ReactNode;
}): any;
export interface StatTileProps {
    title: React.ReactNode;
    value: React.ReactNode;
    note?: React.ReactNode;
    icon?: string;
    tone?: Tone;
    onClick?: () => void;
    loading?: boolean;
}
/** Un numero che conta, il suo nome e una riga di contesto. In fila da 3 o 4. */
export declare function StatTile({ title, value, note, icon, tone, onClick, loading }: StatTileProps): any;
export interface Column<T> {
    key: string;
    label: React.ReactNode;
    width?: string;
    align?: 'left' | 'right' | 'center';
    sortable?: boolean;
    render?: (row: T) => React.ReactNode; /** Su mobile: nascosta. */
    hideOnMobile?: boolean;
    mono?: boolean;
}
export interface TableProps<T> {
    columns: Column<T>[];
    rows: T[];
    rowKey: (row: T) => string;
    onRowClick?: (row: T) => void;
    selectable?: boolean;
    selected?: string[];
    onSelect?: (keys: string[]) => void;
    sort?: {
        key: string;
        dir: 'asc' | 'desc';
    };
    onSort?: (s: {
        key: string;
        dir: 'asc' | 'desc';
    }) => void;
    /** Al massimo due azioni a vista per riga; il resto nel menu ⋮. */
    actions?: (row: T) => React.ReactNode;
    actionsWidth?: number;
    toolbar?: React.ReactNode;
    footer?: React.ReactNode;
    empty?: React.ReactNode;
    loading?: boolean;
    loadingRows?: number;
    rowTone?: (row: T) => 'danger' | 'warning' | undefined;
    label?: string;
    density?: 'md' | 'sm';
    maxHeight?: number | string;
    className?: string;
}
/** La tabella vive sempre su una card: testata incassata, righe da 56, hover, selezione con le caselle che non aprono la riga. */
export declare function Table<T>({ columns: tutte, rows, rowKey, onRowClick, selectable, selected, onSelect, sort, onSort, actions, actionsWidth, toolbar, footer, empty, loading, loadingRows, rowTone, label, density, maxHeight, className }: TableProps<T>): any;
/** Cella con avatar, nome e codice sotto: la prima colonna delle liste di persone. */
export declare function CellPerson({ name, meta, avatar }: {
    name: React.ReactNode;
    meta?: React.ReactNode;
    avatar?: React.ReactNode;
}): any;
/** Barra che compare sopra la tabella quando ci sono righe scelte. */
export declare function SelectionBar({ count, noun, children, onClear }: {
    count: number;
    noun?: string;
    children?: React.ReactNode;
    onClear: () => void;
}): any;
export declare function List({ children, className, label }: {
    children: React.ReactNode;
    className?: string;
    label?: string;
}): any;
export interface ListRowProps {
    title: React.ReactNode;
    meta?: React.ReactNode;
    leading?: React.ReactNode;
    icon?: string;
    trailing?: React.ReactNode;
    onClick?: () => void;
    chevron?: boolean;
    tone?: Tone;
    className?: string;
}
/** Riga di lista: icona o avatar, titolo, una riga sotto, qualcosa a destra. Usata nelle card e su telefono. */
export declare function ListRow({ title, meta, leading, icon, trailing, onClick, chevron, tone, className }: ListRowProps): any;
export declare function KeyValue({ items, columns }: {
    items: {
        label: React.ReactNode;
        value: React.ReactNode;
        note?: React.ReactNode;
        mono?: boolean;
    }[];
    columns?: number;
}): any;
export interface BarDatum {
    label: string;
    value: number;
    highlight?: boolean;
    note?: string;
}
/** Colonne a una serie: barre d'inchiostro, quella da notare in accento. Tooltip al passaggio, griglia leggera. */
export declare function BarChart({ data, height, format, label, ticks }: {
    data: BarDatum[];
    height?: number;
    format?: (n: number) => string;
    label?: string;
    ticks?: number;
}): any;
/** Barre orizzontali in classifica: etichetta, barra, valore. */
export declare function BarList({ data, format, label }: {
    data: BarDatum[];
    format?: (n: number) => string;
    label?: string;
}): any;
export interface CalDay {
    label: string;
    num: string | number;
    today?: boolean;
    closed?: boolean;
}
export interface CalEvent {
    id: string;
    day: number;
    start: string;
    end: string;
    title: string;
    subtitle?: string; /** in corso: pieno d'accento · passata: incassata · annullata: tratteggiata e barrata. */
    status?: 'default' | 'live' | 'past' | 'cancelled';
    note?: {
        text: string;
        tone: 'info' | 'danger';
    };
    lane?: number;
    lanes?: number;
}
export interface WeekCalendarProps {
    days: CalDay[];
    events: CalEvent[];
    from?: number;
    to?: number;
    hourHeight?: number;
    now?: {
        day: number;
        time: string;
    };
    selected?: string;
    onEventClick?: (e: CalEvent) => void;
    label?: string;
}
/** Settimana a ore: giorni in colonna, oggi evidenziato, la linea di adesso, giorni chiusi tratteggiati. */
export declare function WeekCalendar({ days, events, from, to, hourHeight, now, selected, onEventClick, label }: WeekCalendarProps): any;

// ---------- layout
export type Pattern = 'dots' | 'knurl' | 'grain' | 'none';
export interface BrandPanelProps {
    children?: React.ReactNode;
    pattern?: Pattern; /** Dove sta il bagliore dell'accento. */
    glow?: 'bottom' | 'top-right' | 'corners' | 'none';
    radius?: number;
    className?: string;
    style?: React.CSSProperties;
    as?: 'div' | 'section';
}
/** Superficie di marca, scura nei due temi: trama leggera e un bagliore dell'accento. Per accesso, testate e numeri in evidenza. */
export declare function BrandPanel({ children, pattern, glow, radius, className, style, as }: BrandPanelProps): any;
/** Pannello di vetro sopra una superficie di marca. */
export declare function BrandGlass({ children, className, style }: {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}): any;
/** Il nome del prodotto in carattere display, finché il progetto non ha un logo. */
export declare function Wordmark({ name, size, className }: {
    name: string;
    size?: number;
    className?: string;
}): any;
/** Tessera con l'iniziale: icona dell'app, favicon, barra chiusa. */
export declare function AppMark({ letter, size, className }: {
    letter: string;
    size?: number;
    className?: string;
}): any;
export declare function Stack({ gap, children, className, style, row, align, wrap }: {
    gap?: number;
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    row?: boolean;
    align?: React.CSSProperties['alignItems'];
    wrap?: boolean;
}): any;
/** Griglia che si stringe da sola: colonne di almeno `min` pixel. */
export declare function Grid({ min, cols, gap, children, className }: {
    min?: number;
    cols?: string;
    gap?: number;
    children: React.ReactNode;
    className?: string;
}): any;
/** Il corpo scorrevole della pagina, sotto la testata. */
export declare function PageBody({ children, className, gap, flush }: {
    children: React.ReactNode;
    className?: string;
    gap?: number;
    flush?: boolean;
}): any;
export declare function SectionTitle({ title, subtitle, actions }: {
    title: React.ReactNode;
    subtitle?: React.ReactNode;
    actions?: React.ReactNode;
}): any;
export type ShellLayout = 'desktop' | 'rail' | 'mobile';
/** In che forma è il guscio: desktop (da 1280), rail (1024–1279), mobile (sotto 1024). */
export declare const useShellLayout: () => any;
export interface AppShellProps {
    sidebar: Omit<SidebarProps, 'collapsed'>;
    children: React.ReactNode;
    layout?: 'auto' | ShellLayout;
    mobileNav?: BottomItem[];
    onMobileNav?: (id: string) => void;
    mobileTitle?: React.ReactNode;
    banner?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}
/** Il guscio del gestionale: barra laterale e pagina. Si adatta alla larghezza del contenitore, non della finestra. */
export declare function AppShell({ sidebar, children, layout, mobileNav, onMobileNav, mobileTitle, banner, className, style }: AppShellProps): any;
export interface ListPageProps {
    header: PageHeaderProps;
    search?: {
        value: string;
        onChange: (v: string) => void;
        placeholder?: string;
        shortcut?: string;
    };
    filters?: React.ReactNode;
    chips?: React.ReactNode;
    onClearFilters?: () => void;
    count?: React.ReactNode;
    children: React.ReactNode;
    banner?: React.ReactNode;
}
/** Pagina di elenco: testata, barra con ricerca e filtri, filtri applicati con «Azzera», la tabella che riempie il resto. */
export declare function ListPage({ header, search, filters, chips, onClearFilters, count, children, banner }: ListPageProps): any;
/** Pagina di dettaglio: indietro, avatar e titolo con lo stato, comandi, tab; sotto, colonna principale e colonna laterale da 360. */
export declare function DetailPage({ header, aside, children }: {
    header: PageHeaderProps;
    aside?: React.ReactNode;
    children: React.ReactNode;
}): any;
/** Impostazioni: elenco delle sezioni a sinistra (220), la sezione a destra con titolo e comandi. Si salva subito, senza «Salva». */
export declare function SettingsPage({ header, nav, title, subtitle, actions, children }: {
    header: PageHeaderProps;
    nav: {
        items: {
            id: string;
            label: string;
            alert?: boolean;
        }[];
        value: string;
        onChange: (id: string) => void;
    };
    title: React.ReactNode;
    subtitle?: React.ReactNode;
    actions?: React.ReactNode;
    children: React.ReactNode;
}): any;
export interface AuthScreenProps {
    name: string;
    logo?: React.ReactNode;
    title: React.ReactNode;
    text?: React.ReactNode;
    alert?: React.ReactNode;
    children?: React.ReactNode;
    action: {
        label: string;
        onClick?: () => void;
        loading?: boolean;
        disabled?: boolean;
    };
    link?: {
        label: string;
        onClick?: () => void;
    };
    footer?: React.ReactNode;
}
/** Accesso, attivazione, password: superficie di marca, titolo e frase, il modulo su vetro. Il bottone dice cosa succede («Entra»). */
export declare function AuthScreen({ name, logo, title, text, alert, children, action, link, footer }: AuthScreenProps): any;
export interface MemberAppProps {
    name: string;
    logo?: React.ReactNode;
    user?: {
        name: string;
        initials?: string;
        onClick?: () => void;
    };
    title?: React.ReactNode;
    subtitle?: React.ReactNode;
    back?: {
        label: string;
        onClick: () => void;
    };
    tabs: {
        items: {
            id: string;
            label: string;
            icon: string;
            dot?: boolean;
        }[];
        value: string;
        onChange: (id: string) => void;
    };
    children: React.ReactNode;
    className?: string;
}
/** L'app per l'utente finale, su telefono: marchio e avatar in cima, titolo, card una sotto l'altra, la barra a quattro voci. */
export declare function MemberApp({ name, logo, user, title, subtitle, back, tabs, children, className }: MemberAppProps): any;
export interface PassCardProps {
    status?: {
        tone: Tone;
        label: string;
    };
    code?: React.ReactNode;
    progress?: {
        value: number;
        note?: string;
        time?: string;
    };
    footer?: React.ReactNode;
    dim?: boolean;
    overlay?: React.ReactNode;
}
/** Tessera digitale su superficie di marca: stato, codice (QR o numero), quanto dura ancora. */
export declare function PassCard({ status, code, progress, footer, dim, overlay }: PassCardProps): any;
/** Disegno di prova al posto del codice vero: tre angoli e una trama fissa. */
export declare function QrSegnaposto({ size }: {
    size?: number;
}): any;
export type StateKind = 'empty' | 'error' | 'offline' | 'forbidden' | 'notfound' | 'loading';
/** Una pagina che non può mostrare il suo contenuto: dice cosa succede e cosa fare. «loading» disegna lo scheletro della pagina. */
export declare function StatePage({ kind, title, text, action }: {
    kind: StateKind;
    title?: React.ReactNode;
    text?: React.ReactNode;
    action?: React.ReactNode;
    /** Di serie scelta dal tipo (folder-empty, page-error, offline, access-denied, not-found-404); false torna all'icona. */
    illustration?: IllustrationName | false;
    /** true di serie. */
    animated?: boolean | 'hover';
}): any;

// ================= estensioni SaaS

// ---------- formattatori e controlli
export declare function moneyTyping(raw: any, decimals?: number): string;
export declare function moneyBlur(v: any, decimals?: number): any;
export declare function luhn(num: any): boolean;
export declare function cardBrand(d: any): "amex" | "visa" | "mastercard";
export declare function formatCard(d: any, brand: any): any;
export declare function ibanOk(iban: any): boolean;
export declare function pivaOk(p: any): boolean;
export declare function cfOk(cf: any): boolean;
export declare function InputBox({ pre, post, mono, numeric, invalid, size, className, inputRef, id, disabled, boxStyle, ...rest }: {
    [x: string]: any;
    pre?: any;
    post?: any;
    mono?: any;
    numeric?: any;
    invalid?: any;
    size?: string;
    className?: any;
    inputRef?: any;
    id?: any;
    disabled?: any;
    boxStyle?: any;
}): any;
export declare function parseMoney(v: any): number;
export declare function formatEuro(n: any, decimals?: number): string;
export declare function formatNumero(n: any, decimals?: number): string;

// ---------- input e scelte
export declare function MoneyInput({ value, defaultValue, onChange, currency, decimals, size, placeholder, ...rest }: {
    [x: string]: any;
    value?: any;
    defaultValue?: string;
    onChange?: any;
    currency?: string;
    decimals?: number;
    size?: any;
    placeholder?: any;
}): any;
export declare function NumberInput({ value, defaultValue, onChange, min, max, step, unit, stepper, size, stepLabel, ...rest }: {
    [x: string]: any;
    value?: any;
    defaultValue?: number;
    onChange?: any;
    min?: number;
    max?: number;
    step?: number;
    unit?: any;
    stepper?: boolean;
    size?: any;
    stepLabel?: string;
}): any;
export declare function PhoneInput({ value, defaultValue, onChange, prefix, defaultPrefix, onPrefixChange, prefixes, size, ...rest }: {
    [x: string]: any;
    value?: any;
    defaultValue?: string;
    onChange?: any;
    prefix?: any;
    defaultPrefix?: string;
    onPrefixChange?: any;
    prefixes?: {
        value: string;
        label: string;
    }[];
    size?: any;
}): any;
export declare function cardCheck({ number, exp }?: {
    number?: string;
    exp?: string;
}, today?: Date): {
    brand?: string;
    complete?: boolean;
    number?: any;
    exp?: any;
};
export declare function CardInput({ value, defaultValue, onChange, invalid, idPrefix }: {
    value?: any;
    defaultValue?: {
        number: string;
        exp: string;
        cvc: string;
    };
    onChange?: any;
    invalid?: any;
    idPrefix?: any;
}): any;
export declare function IbanInput({ value, defaultValue, onChange, size, ...rest }: {
    [x: string]: any;
    value?: any;
    defaultValue?: string;
    onChange?: any;
    size?: any;
}): any;
export declare function TaxIdInput({ kind, value, defaultValue, onChange, size, ...rest }: {
    [x: string]: any;
    kind?: string;
    value?: any;
    defaultValue?: string;
    onChange?: any;
    size?: any;
}): any;
export declare function OtpInput({ length, value, defaultValue, onChange, onComplete, label, disabled }: {
    length?: number;
    value?: any;
    defaultValue?: string;
    onChange?: any;
    onComplete?: any;
    label?: any;
    disabled?: any;
}): any;
export declare function PasswordInput({ value, defaultValue, onChange, meter, rules, size, autoComplete, ...rest }: {
    [x: string]: any;
    value?: any;
    defaultValue?: string;
    onChange?: any;
    meter?: boolean;
    rules?: (string | ((v: any) => boolean))[][];
    size?: any;
    autoComplete?: any;
}): any;
export declare function CopyField({ value, display, copyLabel, copiedLabel, icon, mono, size, onCopy }: {
    value?: any;
    display?: any;
    copyLabel?: string;
    copiedLabel?: string;
    icon?: any;
    mono?: boolean;
    size?: any;
    onCopy?: any;
}): any;
export declare function Combobox({ options, value, defaultValue, onChange, onSelect, onCreate, createLabel, placeholder, icon, avatars, max, emptyText, size, defaultOpen, label }: {
    options?: any;
    value?: any;
    defaultValue?: string;
    onChange?: any;
    onSelect?: any;
    onCreate?: any;
    createLabel?: (q: any) => string;
    placeholder?: string;
    icon?: string;
    avatars?: any;
    max?: number;
    emptyText?: string;
    size?: any;
    defaultOpen?: boolean;
    label?: any;
}): any;
export declare function MultiSelect({ options, value, defaultValue, onChange, placeholder, label, searchable }: {
    options?: any;
    value?: any;
    defaultValue?: any[];
    onChange?: any;
    placeholder?: string;
    label?: any;
    searchable?: boolean;
}): any;
export declare function TagInput({ value, defaultValue, onChange, placeholder, lowercase, label }: {
    value?: any;
    defaultValue?: any[];
    onChange?: any;
    placeholder?: string;
    lowercase?: boolean;
    label?: any;
}): any;
export declare function Slider({ min, max, step, value, defaultValue, onChange, label, format, ticks, showValue }: {
    min?: number;
    max?: number;
    step?: number;
    value?: any;
    defaultValue?: any;
    onChange?: any;
    label?: any;
    format?: (v: any) => string;
    ticks?: any;
    showValue?: boolean;
}): any;
export declare function WeekdayPicker({ value, defaultValue, onChange, label, disabled }: {
    value?: any;
    defaultValue?: any[];
    onChange?: any;
    label?: string;
    disabled?: any;
}): any;
export declare function frasePerGiorni(days: any, every?: number): string;
export declare function ColorSwatches({ options, value, defaultValue, onChange, label }: {
    options?: {
        value: string;
        label: string;
        color: string;
    }[];
    value?: any;
    defaultValue?: any;
    onChange?: any;
    label?: string;
}): any;
export declare function InlineEdit({ value, defaultValue, onSave, label, className, size, placeholder }: {
    value?: any;
    defaultValue?: string;
    onSave?: any;
    label?: any;
    className?: any;
    size?: string;
    placeholder?: string;
}): any;
export declare function RadioCards({ options, value, defaultValue, onChange, label, columns }: {
    options?: any;
    value?: any;
    defaultValue?: any;
    onChange?: any;
    label?: any;
    columns?: any;
}): any;
export declare function CheckboxCards({ options, value, defaultValue, onChange, label }: {
    options?: any;
    value?: any;
    defaultValue?: any[];
    onChange?: any;
    label?: any;
}): any;
export declare function TileSelect({ options, value, defaultValue, onChange, label, min }: {
    options?: any;
    value?: any;
    defaultValue?: any;
    onChange?: any;
    label?: any;
    min?: number;
}): any;
export declare function PlanPicker({ plans, period, defaultPeriod, onPeriodChange, onChoose, yearlyLabel, monthlyLabel, perMonth, currency }: {
    plans?: any;
    period?: any;
    defaultPeriod?: string;
    onPeriodChange?: any;
    onChoose?: any;
    yearlyLabel?: string;
    monthlyLabel?: string;
    perMonth?: string;
    currency?: string;
}): any;
export declare const PREFISSI: {
    value?: string;
    label?: string;
}[];
export declare const REGOLE_PASSWORD: (string | ((v: any) => boolean))[][];
export declare const GIORNI_SETTIMANA: string[][];
export declare const COLORI_STC: {
    value?: string;
    label?: string;
    color?: string;
}[];

// ---------- passi e moduli
export declare function Stepper({ steps, current, error, onStepClick, label }: {
    steps?: any;
    current?: number;
    error?: any;
    onStepClick?: any;
    label?: string;
}): any;
export declare function VerticalStepper({ steps, current }: {
    steps?: any;
    current?: number;
}): any;
export declare function MobileSteps({ current, total, label }: {
    current?: number;
    total?: any;
    label?: any;
}): any;
export declare function OnboardingChecklist({ title, items, onHide, hideLabel, onItemClick }: {
    title?: string;
    items?: any;
    onHide?: any;
    hideLabel?: string;
    onItemClick?: any;
}): any;
export declare function SegmentedBar({ value, total, label }: {
    value?: any;
    total?: any;
    label?: any;
}): any;
export declare function ColumnMapper({ columns, fields, onChange, sourceLabel, targetLabel, skipValue }: {
    columns?: any;
    fields?: any;
    onChange?: any;
    sourceLabel?: string;
    targetLabel?: string;
    skipValue?: string;
}): any;
export declare function FormSection({ title, description, children, aside }: {
    title?: any;
    description?: any;
    children?: any;
    aside?: any;
}): any;
export declare function FormRow({ columns, children }: {
    columns?: any;
    children?: any;
}): any;
export declare function ErrorSummary({ title, errors }: {
    title?: any;
    errors?: any;
}): any;
export declare function SaveBar({ message, icon, cancelLabel, onCancel, confirmLabel, onConfirm, loading }: {
    message?: any;
    icon?: string;
    cancelLabel?: string;
    onCancel?: any;
    confirmLabel?: string;
    onConfirm?: any;
    loading?: any;
}): any;
export declare function WizardPage({ title, crumbs, steps, current, onStepClick, onClose, closeLabel, children, aside, onBack, onNext, backLabel, nextLabel, nextDisabled, nextLoading, footerNote }: {
    title?: any;
    crumbs?: any;
    steps?: any;
    current?: number;
    onStepClick?: any;
    onClose?: any;
    closeLabel?: string;
    children?: any;
    aside?: any;
    onBack?: any;
    onNext?: any;
    backLabel?: string;
    nextLabel?: string;
    nextDisabled?: any;
    nextLoading?: any;
    footerNote?: any;
}): any;

// ---------- testate e navigazione
export declare function Breadcrumb({ items, max, label }: {
    items?: any;
    max?: number;
    label?: string;
}): any;
export declare function HeaderStats({ items }: {
    items?: any;
}): any;
export declare function StatusPath({ steps, current, label }: {
    steps?: any;
    current?: number;
    label?: string;
}): any;
export declare function RichPageHeader({ crumbs, title, subtitle, badge, avatar, actions, tabs, stats, status, steps, toolbar, className }: {
    crumbs?: any;
    title?: any;
    subtitle?: any;
    badge?: any;
    avatar?: any;
    actions?: any;
    tabs?: any;
    stats?: any;
    status?: any;
    steps?: any;
    toolbar?: any;
    className?: any;
}): any;
export declare function HeroHeader({ overline, title, text, actions, children }: {
    overline?: any;
    title?: any;
    text?: any;
    actions?: any[];
    children?: any;
}): any;
export declare function CompactHeader({ back, avatar, title, badge, actions, sticky }: {
    back?: any;
    avatar?: any;
    title?: any;
    badge?: any;
    actions?: any;
    sticky?: boolean;
}): any;
export declare function SectionHeader({ title, description, actions, count, link, size, as }: {
    title?: any;
    description?: any;
    actions?: any;
    count?: any;
    link?: any;
    size?: string;
    as?: any;
}): any;
export declare function MobileLargeTitle({ title, subtitle, left, right, collapsed }: {
    title?: any;
    subtitle?: any;
    left?: any;
    right?: any;
    collapsed?: any;
}): any;
export declare function Accordion({ items, value, defaultValue, onChange, multiple }: {
    items?: any;
    value?: any;
    defaultValue?: any[];
    onChange?: any;
    multiple?: boolean;
}): any;
export declare function NotificationCenter({ title, items, tabs, tab, onTabChange, onMarkAllRead, markLabel, footer, emptyText, className }: {
    title?: string;
    items?: any;
    tabs?: any;
    tab?: any;
    onTabChange?: any;
    onMarkAllRead?: any;
    markLabel?: string;
    footer?: any;
    emptyText?: string;
    className?: any;
}): any;
export declare function TreeView({ nodes, expanded, defaultExpanded, onExpandedChange, selected, defaultSelected, onSelect, label }: {
    nodes?: any;
    expanded?: any;
    defaultExpanded?: any[];
    onExpandedChange?: any;
    selected?: any;
    defaultSelected?: any;
    onSelect?: any;
    label?: string;
}): any;
export declare function CheckboxTree({ groups, value, defaultValue, onChange, title }: {
    groups?: any;
    value?: any;
    defaultValue?: any[];
    onChange?: any;
    title?: any;
}): any;
export declare function TopNav({ brand, items, active, onNavigate, right, label }: {
    brand?: any;
    items?: any;
    active?: any;
    onNavigate?: any;
    right?: any;
    label?: string;
}): any;
export declare function CoachMark({ title, text, step, total, onSkip, onNext, skipLabel, nextLabel, children, open }: {
    title?: any;
    text?: any;
    step?: any;
    total?: any;
    onSkip?: any;
    onNext?: any;
    skipLabel?: string;
    nextLabel?: any;
    children?: any;
    open?: boolean;
}): any;

// ---------- dati e collaborazione
export declare function Delta({ value, flat, suffix, decimals }: {
    value?: any;
    flat?: any;
    suffix?: string;
    decimals?: any;
}): any;
export declare function TrendTile({ title, value, delta, flat, data, note, goal, accent }: {
    title?: any;
    value?: any;
    delta?: any;
    flat?: any;
    data?: any;
    note?: any;
    goal?: any;
    accent?: any;
}): any;
export declare function UsageMeter({ label, used, max, unit, note, format }: {
    label?: any;
    used?: any;
    max?: any;
    unit?: any;
    note?: any;
    format?: (n: any, decimals?: number) => string;
}): any;
export declare function Timeline({ groups, items }: {
    groups?: any;
    items?: any;
}): any;
export declare function Comment({ author, avatar, time, children, actions, reply }: {
    author?: any;
    avatar?: any;
    time?: any;
    children?: any;
    actions?: any;
    reply?: any;
}): any;
export declare function Mention({ children }: {
    children?: any;
}): any;
export declare function CommentComposer({ placeholder, submitLabel, onSubmit, tools, value, defaultValue, onChange, rows, label }: {
    placeholder?: string;
    submitLabel?: string;
    onSubmit?: any;
    tools?: any;
    value?: any;
    defaultValue?: string;
    onChange?: any;
    rows?: number;
    label?: string;
}): any;
export declare function AvatarGroup({ names, max, size, label }: {
    names?: any;
    max?: number;
    size?: number;
    label?: any;
}): any;
export declare function Tag({ children, color, onRemove, outline, size, onClick, removeLabel }: {
    children?: any;
    color?: any;
    onRemove?: any;
    outline?: any;
    size?: string;
    onClick?: any;
    removeLabel?: any;
}): any;
export declare function Kanban({ columns, onAdd, onCardClick, dragging, dropColumn }: {
    columns?: any;
    onAdd?: any;
    onCardClick?: any;
    dragging?: any;
    dropColumn?: any;
}): any;
export declare function FileList({ files, onOpen, onDownload, menu, downloadLabel }: {
    files?: any;
    onOpen?: any;
    onDownload?: any;
    menu?: any;
    downloadLabel?: string;
}): any;
export declare function HoverCard({ children, name, subtitle, dot, details, actions, delay, defaultOpen, placement }: {
    children?: any;
    name?: any;
    subtitle?: any;
    dot?: any;
    details?: any;
    actions?: any;
    delay?: number;
    defaultOpen?: boolean;
    placement?: string;
}): any;
export declare function ExpandableTable({ columns, rows, renderDetail, footer, density, expanded, defaultExpanded, onExpandedChange, label, rowKey }: {
    columns?: any;
    rows?: any;
    renderDetail?: any;
    footer?: any;
    density?: string;
    expanded?: any;
    defaultExpanded?: any[];
    onExpandedChange?: any;
    label?: any;
    rowKey?: string;
}): any;

// ---------- grafici
export declare function niceMax(v: any, ticks?: number): {
    max?: number;
    step?: number;
};
export declare function ChartLegend({ items, vertical }: {
    items?: any;
    vertical?: any;
}): any;
export declare function ChartHeader({ label, value, delta, legend, children }: {
    label?: any;
    value?: any;
    delta?: any;
    legend?: any;
    children?: any;
}): any;
export declare function LineChart({ data, compare, area, height, format, tooltipFormat, xTicks, label, currentLabel, prevLabel, yTicks, max }: {
    data?: any;
    compare?: any;
    area?: any;
    height?: number;
    format?: (n: any) => string;
    tooltipFormat?: any;
    xTicks?: any;
    label?: string;
    currentLabel?: any;
    prevLabel?: string;
    yTicks?: number;
    max?: any;
}): any;
export declare function AreaChart(props: any): any;
export declare function DonutChart({ data, format, totalLabel, size, label, legend }: {
    data?: any;
    format?: (n: any, decimals?: number) => string;
    totalLabel?: string;
    size?: number;
    label?: string;
    legend?: boolean;
}): any;
export declare function StackedBarChart({ categories, series, height, format, label, showTotals }: {
    categories?: any;
    series?: any;
    height?: number;
    format?: (n: any, decimals?: number) => string;
    label?: string;
    showTotals?: boolean;
}): any;
export declare function ComboChart({ categories, bars, line, height, barFormat, lineFormat, lineMin, lineMax, label }: {
    categories?: any;
    bars?: any;
    line?: any;
    height?: number;
    barFormat?: (n: any, decimals?: number) => string;
    lineFormat?: (v: any) => string;
    lineMin?: any;
    lineMax?: any;
    label?: string;
}): any;
export declare function FunnelChart({ steps, format, dropLabel }: {
    steps?: any;
    format?: (n: any, decimals?: number) => string;
    dropLabel?: string;
}): any;
export declare function Sparkline({ data, width, height, accent, label }: {
    data?: any;
    width?: number;
    height?: number;
    accent?: any;
    label?: any;
}): any;
export declare function ProgressRing({ value, size, stroke, label, showValue }: {
    value?: any;
    size?: number;
    stroke?: any;
    label?: string;
    showValue?: boolean;
}): any;
export declare function CalendarHeatmap({ values, levels, lessLabel, moreLabel, dayLabels, cellTitle, label }: {
    values?: any;
    levels?: any;
    lessLabel?: string;
    moreLabel?: string;
    dayLabels?: string[];
    cellTitle?: (v: any) => string;
    label?: string;
}): any;
export declare function HeatScale({ less, more }: {
    less?: string;
    more?: string;
}): any;
export declare function HourHeatmap({ rows, columns, lessLabel, moreLabel, label, cellTitle }: {
    rows?: any;
    columns?: any;
    lessLabel?: string;
    moreLabel?: string;
    label?: string;
    cellTitle?: any;
}): any;

// ---------- azioni, mobile, abbonamento
export declare function Popconfirm({ open, onClose, anchor, title, text, confirmLabel, cancelLabel, onConfirm, placement, tone }: {
    open?: any;
    onClose?: any;
    anchor?: any;
    title?: any;
    text?: any;
    confirmLabel?: any;
    cancelLabel?: string;
    onConfirm?: any;
    placement?: string;
    tone?: string;
}): any;
export declare function TypeToConfirm({ open, onClose, title, description, confirmText, confirmLabel, onConfirm, cancelLabel, loading }: {
    open?: any;
    onClose?: any;
    title?: any;
    description?: any;
    confirmText?: any;
    confirmLabel?: any;
    onConfirm?: any;
    cancelLabel?: string;
    loading?: any;
}): any;
export declare function UpgradeCard({ overline, title, text, features, primary, secondary, compact, icon }: {
    overline?: any;
    title?: any;
    text?: any;
    features?: any;
    primary?: any;
    secondary?: any;
    compact?: any;
    icon?: string;
}): any;
export declare function ActionSheet({ open, onClose, title, subtitle, items, onSelect, cancelLabel, inline }: {
    open?: any;
    onClose?: any;
    title?: any;
    subtitle?: any;
    items?: any;
    onSelect?: any;
    cancelLabel?: string;
    inline?: any;
}): any;
export declare function SwipeRow({ actions, children, defaultOpen }: {
    actions?: any;
    children?: any;
    defaultOpen?: boolean;
}): any;
export declare function Fab({ icon, label, onClick, withBottomNav }: {
    icon?: string;
    label?: any;
    onClick?: any;
    withBottomNav?: boolean;
}): any;
export declare function CtaBar({ total, children, inline }: {
    total?: any;
    children?: any;
    inline?: boolean;
}): any;
export declare function PinPad({ length, value, defaultValue, onChange, onComplete, name, text, onExit, exitLabel, avatar }: {
    length?: number;
    value?: any;
    defaultValue?: string;
    onChange?: any;
    onComplete?: any;
    name?: any;
    text?: any;
    onExit?: any;
    exitLabel?: string;
    avatar?: any;
}): any;
export declare function DayStrip({ days, value, defaultValue, onChange, today, label }: {
    days?: any;
    value?: any;
    defaultValue?: any;
    onChange?: any;
    today?: any;
    label?: string;
}): any;
export declare function SplitButton({ children, onClick, items, onSelect, variant, size, menuLabel, icon, disabled }: {
    children?: any;
    onClick?: any;
    items?: any;
    onSelect?: any;
    variant?: string;
    size?: string;
    menuLabel?: string;
    icon?: any;
    disabled?: any;
}): any;
export declare function ButtonGroup({ children, label }: {
    children?: any;
    label?: any;
}): any;
export declare function ToggleGroup({ options, value, defaultValue, onChange, label, size, multiple }: {
    options?: any;
    value?: any;
    defaultValue?: any;
    onChange?: any;
    label?: any;
    size?: string;
    multiple?: any;
}): any;
export declare function ButtonCount({ value }: {
    value?: any;
}): any;
export declare function PillTabs({ items, value, defaultValue, onChange, label }: {
    items?: any;
    value?: any;
    defaultValue?: any;
    onChange?: any;
    label?: string;
}): any;
export declare function VerticalTabs({ items, value, defaultValue, onChange, label }: {
    items?: any;
    value?: any;
    defaultValue?: any;
    onChange?: any;
    label?: string;
}): any;
export declare function IconSegmented({ items, value, defaultValue, onChange, label, iconOnly }: {
    items?: any;
    value?: any;
    defaultValue?: any;
    onChange?: any;
    label?: string;
    iconOnly?: any;
}): any;
export declare function SegmentedProgress({ value, total, label, showValue }: {
    value?: any;
    total?: any;
    label?: any;
    showValue?: boolean;
}): any;
export declare function StackedProgress({ parts, label, total, legend, format }: {
    parts?: any;
    label?: any;
    total?: any;
    legend?: boolean;
    format?: (v: any) => string;
}): any;
export declare function ChoiceChips({ options, value, defaultValue, onChange, multiple, label }: {
    options?: any;
    value?: any;
    defaultValue?: any;
    onChange?: any;
    multiple?: any;
    label?: any;
}): any;
export declare function NotificationMatrix({ events, channels, value, defaultValue, onChange, eventLabel }: {
    events?: any;
    channels?: any;
    value?: any;
    defaultValue?: {};
    onChange?: any;
    eventLabel?: string;
}): any;
export declare function IntegrationCard({ logo, name, description, connected, onConnect, onSettings, onDisconnect, connectLabel, settingsLabel, disconnectLabel }: {
    logo?: any;
    name?: any;
    description?: any;
    connected?: any;
    onConnect?: any;
    onSettings?: any;
    onDisconnect?: any;
    connectLabel?: string;
    settingsLabel?: string;
    disconnectLabel?: string;
}): any;
export declare function IntegrationGrid({ children }: {
    children?: any;
}): any;
export declare function PaymentMethod({ brand, last4, exp, onChange, changeLabel }: {
    brand?: string;
    last4?: any;
    exp?: any;
    onChange?: any;
    changeLabel?: string;
}): any;

// ===== Caricamento =====
export declare function LoaderSpinner({ size, tone, className }: { size?: number; tone?: 'accent' | 'ink' | 'brand'; className?: string }): any;
export declare function GlassTile({ size, round, children }: { size?: number; round?: boolean; children?: any }): any;
export declare function Loader({ label, detail, size, slow, slowLabel, slowDetail, onRetry, onBackground, retryLabel, backgroundLabel }: { label?: string; detail?: any; size?: 'md' | 'sm'; slow?: boolean; slowLabel?: string; slowDetail?: string; onRetry?: () => void; onBackground?: () => void; retryLabel?: string; backgroundLabel?: string }): any;
export declare function LoadingPill({ label, children }: { label?: string; children?: any }): any;
export declare function LoadMore({ label, count }: { label?: string; count?: number }): any;
export declare function RefreshOverlay({ loading, label, children }: { loading?: boolean; label?: string; children?: any }): any;
export declare function RouteProgress({ active, label }: { active?: boolean; label?: string }): any;
export declare function TypingDots({ label }: { label?: string }): any;
export declare function SaveStatus({ state, time, savingLabel, savedLabel, errorLabel }: { state?: 'saving' | 'saved' | 'error'; time?: string; savingLabel?: string; savedLabel?: string; errorLabel?: string }): any;
export declare function SkeletonLayout({ kind, rows, count, bars, today, label }: { kind?: 'table' | 'kpi' | 'detail' | 'chart' | 'calendar' | 'list' | 'panel'; rows?: number; count?: number; bars?: number; today?: number; label?: string }): any;
export declare function ProgressSteps({ steps, current }: { steps?: string[]; current?: number }): any;
export declare function UploadQueue({ title, total, files, doneLabel, waitingLabel }: { title?: string; total?: string; files?: { name: string; status?: 'done' | 'uploading' | 'waiting' | 'error'; value?: number; error?: string }[]; doneLabel?: string; waitingLabel?: string }): any;
export declare function ProgressToast({ title, value, text, onHide, hideLabel }: { title?: string; value?: number; text?: string; onHide?: () => void; hideLabel?: string }): any;
export declare function DocumentLoader({ title, code, detail }: { title?: string; code?: string; detail?: string }): any;
export declare function BootScreen({ kind, fill, mark, name, value, step, initials, title, detail, from, to }: { kind?: 'boot' | 'signin' | 'switch'; fill?: boolean; mark?: string; name?: string; value?: number; step?: string; initials?: string; title?: string; detail?: string; from?: string; to?: string }): any;
export declare function PendingCard({ kind, amount, title, text }: { kind?: 'payment' | 'email'; amount?: string; title?: string; text?: string }): any;
export declare function ReconnectBanner({ title, seconds }: { title?: string; seconds?: number }): any;
export declare function StaleBadge({ label, time }: { label?: string; time?: string }): any;
export declare function LoadState({ kind, title, text, action }: { kind?: 'cancelled' | 'error'; title?: string; text?: string; action?: { label: string; onClick: () => void } }): any;

// ===== Illustrazioni =====
/** Nomi delle illustrazioni: vedi STC.ILLUSTRAZIONI per l'elenco con titolo e gruppo. */
export type IllustrationName =
  | 'search-empty' | 'filter-empty' | 'search-start' | 'search-recent'
  | 'registry-missing' | 'clients-first' | 'suppliers-first' | 'contact-not-found' | 'item-not-found' | 'duplicate'
  | 'doc-missing' | 'doc-not-found' | 'invoice-not-found' | 'invoices-first' | 'attachments-empty' | 'folder-empty' | 'upload-failed' | 'format-unsupported' | 'file-too-large' | 'sign-pending' | 'archive-empty' | 'trash-empty'
  | 'mail-sent' | 'mail-recovery' | 'mail-verify' | 'invite-sent' | 'mail-bounced' | 'inbox-empty' | 'notifications-empty' | 'all-read' | 'comments-first'
  | 'code-sent' | 'password-updated' | 'link-expired' | 'session-expired' | 'access-denied' | 'account-locked' | 'new-device'
  | 'done' | 'payment-ok' | 'payment-failed' | 'export-ready' | 'import-done' | 'import-errors' | 'approval-pending' | 'deleted'
  | 'today-empty' | 'period-empty' | 'tasks-first' | 'all-done' | 'deadlines-empty'
  | 'orders-first' | 'cart-empty' | 'shipping-empty' | 'order-shipped' | 'out-of-stock'
  | 'chart-empty' | 'report-empty' | 'history-empty'
  | 'offline' | 'not-found-404' | 'page-error' | 'maintenance' | 'plan-upgrade' | 'integration-connect' | 'update-available';

/** Illustrazione in vetro sul colore del tema, per stati vuoti, esiti e messaggi. */
export interface IllustrationProps {
  /** Quale illustrazione. */
  name: IllustrationName;
  /** md 120 (di serie) · sm 88 · xs 56 · lg 160 · oppure px. */
  size?: 'lg' | 'md' | 'sm' | 'xs' | number;
  /** true di serie; "hover" si anima solo al passaggio sul contenitore; false ferma. */
  animated?: boolean | 'hover';
  /** Solo se l'illustrazione porta un'informazione: altrimenti resta decorativa. */
  label?: string;
  className?: string;
  style?: React.CSSProperties;
}
export declare function Illustration(props: IllustrationProps): JSX.Element | null;
/** Elenco delle illustrazioni con titolo proposto, tipo e gruppo. */
export declare const ILLUSTRAZIONI: { name: IllustrationName; label: string; title: string; kind: string; group: string }[];
/** L'SVG come testo, per usarla fuori da React. */
export declare function illustrationSvg(name: IllustrationName, size?: number): string | null;

export declare const ICONE: Record<string, string>;
declare global { interface Window { STC: typeof import('./index'); } }

// ================= regole di default (vedi default.md)
/** I valori che STC usa quando non scrivi niente. Solo lettura. */
export declare const DEFAULTS: {
    readonly theme: 'light';
    readonly illustration: { animated: true; size: 'md'; empty: 'folder-empty' };
    readonly emptyState: { illustration: 'folder-empty'; animated: true };
    readonly statePage: { empty: 'folder-empty'; error: 'page-error'; offline: 'offline'; forbidden: 'access-denied'; notfound: 'not-found-404' };
    readonly toast: { placement: 'auto'; duration: 4000; durationWithAction: 8000; phoneBelow: 600 };
    readonly button: { variant: 'secondary'; size: 'form' };
    readonly dialog: { size: 'confirm' };
    readonly waits: { none: 300; phrase: 2000; slow: 10000 };
};

// ---------- componenti complessi (99)
/** Isola eventi. */
export declare function EventIsland(props: {
    events?: any;
    timeout?: any;
    autoOpen?: any;
    onExpire?: any;
    onResolve?: any;
    onDismiss?: any;
    position?: any;
    placement?: any;
    label?: any;
    defaultOpen?: any;
    state?: any;
}): any;
/** Card articolo. */
export declare function ArticleCard(props: {
    variant?: any;
    image?: any;
    imageTone?: any;
    category?: any;
    title?: any;
    excerpt?: any;
    author?: any;
    minutes?: any;
    date?: any;
    isNew?: any;
    saved?: any;
    onSave?: any;
    progress?: any;
    href?: any;
    loading?: any;
}): any;
/** Card evento. */
export declare function EventCard(props: {
    variant?: any;
    date?: any;
    time?: any;
    title?: any;
    place?: any;
    online?: any;
    people?: any;
    seats?: any;
    capacity?: any;
    status?: any;
    image?: any;
    onJoin?: any;
    onLeave?: any;
    loading?: any;
}): any;
/** Card prodotto. */
export declare function ProductCard(props: {
    variant?: any;
    name?: any;
    brand?: any;
    price?: any;
    was?: any;
    image?: any;
    image2?: any;
    imageTone?: any;
    colors?: any;
    rating?: any;
    reviews?: any;
    stock?: any;
    badge?: any;
    loading?: any;
    onAdd?: any;
}): any;
/** Stelle di valutazione. */
export declare function Stars(props: {
    value?: any;
    count?: any;
    size?: any;
}): any;
/** Card persona. */
export declare function PersonCard(props: {
    variant?: any;
    name?: any;
    role?: any;
    team?: any;
    email?: any;
    phone?: any;
    presence?: any;
    until?: any;
    tags?: any;
    src?: any;
    loading?: any;
    me?: any;
}): any;
/** Card testimonianza. */
export declare function TestimonialCard(props: {
    variant?: any;
    quote?: any;
    author?: any;
    role?: any;
    company?: any;
    rating?: any;
    video?: any;
    loading?: any;
    clamp?: any;
}): any;
/** Card transazione. */
export declare function TransactionList(props: {
    groups?: any;
    loading?: any;
    empty?: any;
    variant?: any;
}): any;
/** Carta di pagamento 3D. */
export declare function PaymentCard3D(props: {
    holder?: any;
    last4?: any;
    number?: any;
    exp?: any;
    cvc?: any;
    network?: any;
    finish?: any;
    kind?: any;
    state?: any;
    loading?: any;
    tilt?: any;
}): any;
/** Pila di card da scorrere. */
export declare function SwipeStack(props: {
    items?: any;
    render?: any;
    onDecide?: any;
    leftLabel?: any;
    rightLabel?: any;
    empty?: any;
}): any;
/** Card snippet di codice. */
export declare function CodeSnippet(props: {
    tabs?: any;
    file?: any;
    theme?: any;
    highlight?: any;
    wrap?: any;
    loading?: any;
    maxLines?: any;
}): any;
/** Card confronto. */
export declare function CompareCards(props: {
    options?: any;
    rows?: any;
    value?: any;
    current?: any;
    recommended?: any;
    onChange?: any;
    layout?: any;
    loading?: any;
}): any;
/** Immagine con segnaposto e scheletro. */
export declare function Media(props: {
    src?: any;
    alt?: any;
    ratio?: any;
    icon?: any;
    className?: any;
    children?: any;
    tone?: any;
}): any;
/** Blocco data (giorno e mese). */
export declare function DateBlock(props: {
    date?: any;
    tone?: any;
}): any;
/** Barra promo con conto alla rovescia. */
export declare function PromoBar(props: {
    tone?: any;
    badge?: any;
    text?: any;
    short?: any;
    code?: any;
    seconds?: any;
    cta?: any;
    onDismiss?: any;
    dismissible?: any;
    endedText?: any;
}): any;
/** Consenso cookie. */
export declare function CookieConsent(props: {
    variant?: any;
    cats?: any;
    defaultView?: any;
    onSave?: any;
    policyHref?: any;
    state?: any;
}): any;
/** Prova che scade. */
export declare function TrialBanner(props: {
    variant?: any;
    days?: any;
    total?: any;
    plan?: any;
    onUpgrade?: any;
    loading?: any;
}): any;
/** Annuncio a pillola. */
export declare function AnnouncePill(props: {
    tag?: any;
    text?: any;
    href?: any;
    variant?: any;
    shine?: any;
    loading?: any;
}): any;
/** Modalità di prova. */
export declare function SandboxMode(props: {
    variant?: any;
    active?: any;
    label?: any;
    note?: any;
    onToggle?: any;
    children?: any;
}): any;
/** Invito a scaricare l'app. */
export declare function AppInvite(props: {
    variant?: any;
    name?: any;
    sub?: any;
    rating?: any;
    reviews?: any;
    installed?: any;
    onDismiss?: any;
}): any;
/** Voto da 0 a 10. */
export declare function NpsSurvey(props: {
    variant?: any;
    question?: any;
    onSubmit?: any;
    step?: any;
    score?: any;
}): any;
/** Nuova versione disponibile. */
export declare function UpdateAvailable(props: {
    variant?: any;
    version?: any;
    notes?: any;
    state?: any;
    critical?: any;
    seconds?: any;
}): any;
/** Nastro di notizie. */
export declare function NewsTicker(props: {
    items?: any;
    label?: any;
    tone?: any;
    speed?: any;
    loading?: any;
}): any;
/** Schermata finta di prodotto per le sezioni pubbliche. */
export declare function Screen(props: {
    kind?: any;
    tone?: any;
    label?: any;
    children?: any;
}): any;
/** Griglia bento. */
export declare function BentoGrid(props: {
    items?: any;
    loading?: any;
}): any;
/** Funzioni a schede con immagine. */
export declare function FeatureTabs(props: {
    tabs?: any;
    autoplay?: any;
    loading?: any;
}): any;
/** Immagine che resta mentre scorri. */
export declare function StickyScroll(props: {
    steps?: any;
    height?: any;
}): any;
/** Noi contro loro. */
export declare function VersusTable(props: {
    us?: any;
    them?: any;
    rows?: any;
    note?: any;
}): any;
/** Integrazioni in orbita. */
export declare function IntegrationOrbit(props: {
    center?: any;
    rings?: any;
    more?: any;
    loading?: any;
}): any;
/** Registro delle novità. */
export declare function Changelog(props: {
    entries?: any;
    seen?: any;
    loading?: any;
    pageSize?: any;
}): any;
/** Iscrizione alla newsletter. */
export declare function Newsletter(props: {
    variant?: any;
    title?: any;
    solo?: any;
    text?: any;
    novità?: any;
    count?: any;
    state?: any;
    taken?: any;
}): any;
/** Barra laterale a due livelli. */
export declare function TwoLevelSidebar(props: {
    sections?: any;
    defaultSec?: any;
    defaultItem?: any;
    height?: any;
    children?: any;
}): any;
/** Elenco e dettaglio. */
export declare function ListDetail(props: {
    items?: any;
    render?: any;
    min?: any;
    max?: any;
    start?: any;
    height?: any;
    loading?: any;
    empty?: any;
}): any;
/** Indice della pagina. */
export declare function PageToc(props: {
    items?: any;
    rootRef?: any;
    title?: any;
}): any;
/** Schede dei documenti. */
export declare function DocTabs(props: {
    tabs?: any;
    max?: any;
}): any;
/** Mega menu. */
export declare function MegaMenu(props: {
    menus?: any;
    brand?: any;
    defaultOpen?: any;
}): any;
/** Barra che diventa una pillola di vetro. */
export declare function GlassPillNav(props: {
    links?: any;
    brand?: any;
    rootRef?: any;
    threshold?: any;
}): any;
/** Filtri a chip con conteggi. */
export declare function FilterChips(props: {
    options?: any;
    multiple?: any;
    value?: any;
    defaultValue?: any;
    onChange?: any;
    allLabel?: any;
    total?: any;
    loading?: any;
    label?: any;
}): any;
/** Pannello a faccette. */
export declare function FacetPanel(props: {
    facets?: any;
    defaultValue?: any;
    total?: any;
    loading?: any;
    sticky?: any;
    onChange?: any;
}): any;
/** Ricerca con gettoni. */
export declare function TokenSearch(props: {
    fields?: any;
    defaultTokens?: any;
    placeholder?: any;
    es?: any;
    onChange?: any;
}): any;
/** Filtri su telefono. */
export declare function MobileFilters(props: {
    groups?: any;
    sorts?: any;
    total?: any;
    defaultOpen?: any;
    defaultValue?: any;
    items?: any;
}): any;
/** Intervallo con istogramma. */
export declare function RangeHistogram(props: {
    data?: any;
    min?: any;
    max?: any;
    step?: any;
    defaultValue?: any;
    unit?: any;
    label?: any;
    countLabel?: any;
    loading?: any;
}): any;
/** Filtro per colori e taglie. */
export declare function VariantFilter(props: {
    colors?: any;
    sizes?: any;
    defaultColors?: any;
    defaultSizes?: any;
    onlyAvailable?: any;
}): any;
/** Barra della tabella. */
export declare function TableToolbar(props: {
    rows?: any;
    loading?: any;
}): any;
/** Riepilogo dei filtri attivi. */
export declare function ActiveFilters(props: {
    filters?: any;
    total?: any;
    query?: any;
    max?: any;
    zeroHint?: any;
}): any;
/** Cerca in quest'area. */
export declare function SearchArea(props: {
    height?: any;
    auto?: any;
    state?: any;
}): any;
/** Filtro rapido con un tasto. */
export declare function QuickKeys(props: {
    presets?: any;
    items?: any;
    render?: any;
}): any;
/** Importo in centesimi scritto all'italiana: euro(123450) → «€ 1.234,50». */
export declare function euro(cents: number): string;
/** Riepilogo con IVA. */
export declare function OrderSummary(props: {
    lines?: any;
    shipping?: any;
    discount?: any;
    vat?: any;
    freeFrom?: any;
    collapsible?: any;
    loading?: any;
    title?: any;
    children?: any;
    editable?: any;
}): any;
/** Codice sconto. */
export declare function PromoCode(props: {
    codes?: any;
    subtotal?: any;
    defaultOpen?: any;
    defaultApplied?: any;
    onApply?: any;
}): any;
/** Scelta della spedizione. */
export declare function ShippingPicker(props: {
    options?: any;
    defaultValue?: any;
    freeFrom?: any;
    subtotal?: any;
    loading?: any;
    lockers?: any;
}): any;
/** Pagamento veloce. */
export declare function ExpressPay(props: {
    methods?: any;
    total?: any;
    unavailable?: any;
    divider?: any;
    onPay?: any;
}): any;
/** Paga a rate. */
export declare function Installments(props: {
    total?: any;
    plans?: any;
    max?: any;
    min?: any;
    defaultN?: any;
}): any;
/** Mancia e importi rapidi. */
export declare function TipPicker(props: {
    base?: any;
    mode?: any;
    presets?: any;
    defaultValue?: any;
    min?: any;
    title?: any;
    note?: any;
}): any;
/** Aggiungi anche. */
export declare function CrossSell(props: {
    items?: any;
    title?: any;
    max?: any;
    loading?: any;
    layout?: any;
}): any;
/** Carrello laterale. */
export declare function CartDrawer(props: {
    lines?: any;
    freeFrom?: any;
    shipping?: any;
    defaultOpen?: any;
    cross?: any;
}): any;
/** Attesa della banca. */
export declare function BankWait(props: {
    state?: any;
    amount?: any;
    seconds?: any;
    method?: any;
    bank?: any;
}): any;
/** Ordine confermato. */
export declare function OrderConfirmed(props: {
    number?: any;
    email?: any;
    eta?: any;
    guest?: any;
    lines?: any;
    total?: any;
}): any;
/** Ricevuta. */
export declare function Receipt(props: {
    variant?: any;
    merchant?: any;
    vatId?: any;
    addr?: any;
    number?: any;
    date?: any;
    lines?: any;
    vat?: any;
    method?: any;
    status?: any;
}): any;
/** Pagamento in una pagina. */
export declare function OnePageCheckout(props: {
    lines?: any;
    shippingOptions?: any;
    lockers?: any;
}): any;
/** Una domanda alla volta. */
export declare function OneQuestion(props: {
    questions?: any;
    title?: any;
    onDone?: any;
}): any;
/** Form a conversazione. */
export declare function ChatForm(props: {
    steps?: any;
    bot?: any;
    onDone?: any;
}): any;
/** Form lungo con indice. */
export declare function LongForm(props: {
    sections?: any;
    height?: any;
}): any;
/** Indirizzo con mappa. */
export declare function AddressMap(props: {
    defaultPicked?: any;
    outOfZone?: any;
}): any;
/** Firma. */
export declare function SignaturePad(props: {
    name?: any;
    disabled?: any;
    height?: any;
    defaultMode?: any;
}): any;
/** Editor di testo. */
export declare function RichEditor(props: {
    defaultHtml?: any;
    placeholder?: any;
    max?: any;
    readOnly?: any;
    minHeight?: any;
}): any;
/** Menzioni e tag. */
export declare function MentionInput(props: {
    people?: any;
    tags?: any;
    placeholder?: any;
    onSend?: any;
}): any;
/** Ripetizione degli eventi. */
export declare function Recurrence(props: {
    defaultFreq?: any;
    defaultDays?: any;
    start?: any;
}): any;
/** Orari di apertura. */
export declare function OpeningHours(props: {
    defaultValue?: any;
    now?: any;
}): any;
/** Ritaglio dell'immagine. */
export declare function ImageCrop(props: {
    shape?: any;
    ratio?: any;
    hue?: any;
    defaultZoom?: any;
}): any;
/** Righe ripetibili. */
export declare function RepeatRows(props: {
    columns?: any;
    defaultRows?: any;
    min?: any;
    max?: any;
    addLabel?: any;
    total?: any;
}): any;
/** Prenotazione di un orario. */
export declare function SlotBooking(props: {
    days?: any;
    closed?: any;
    full?: any;
    service?: any;
    loading?: any;
}): any;
/** Calendario del mese. */
export declare function MonthCalendar(props: {
    events?: any;
    loading?: any;
    today?: any;
    defaultMonth?: any;
}): any;
/** Gantt. */
export declare function Gantt(props: {
    tasks?: any;
    start?: any;
    span?: any;
    today?: any;
}): any;
/** Agenda per persona. */
export declare function PersonAgenda(props: {
    people?: any;
    appts?: any;
    from?: any;
    to?: any;
    now?: any;
    loading?: any;
}): any;
/** Organigramma. */
export declare function OrgChart(props: {
    root?: any;
    height?: any;
}): any;
/** Mappa con gruppi. */
export declare function ClusterMap(props: {
    points?: any;
    height?: any;
}): any;
/** Galleria con visore. */
export declare function Gallery(props: {
    items?: any;
    loading?: any;
}): any;
/** Visore PDF con note. */
export declare function PdfNotes(props: {
    initialNotes?: any;
}): any;
/** Confronto tra versioni. */
export declare function VersionDiff(props: {
    versions?: any;
}): any;
/** Foglio modificabile. */
export declare function SheetGrid(props: {
    data?: any;
    rows?: any;
    money?: any;
}): any;
/** Lavagna. */
export declare function Whiteboard(props: {
    notes?: any;
    links?: any;
    height?: any;
}): any;
/** Tabella a gruppi con totali. */
export declare function GroupedTable(props: {
    rows?: any;
    loading?: any;
}): any;
/** Risposta che si scrive. */
export declare function StreamingAnswer(props: {
    question?: any;
    answer?: any;
    sources?: any;
    state?: any;
}): any;
/** Pannello assistente. */
export declare function AssistantPanel(props: {
    context?: any;
    suggestions?: any;
    defaultMessages?: any;
}): any;
/** Stato del ragionamento. */
export declare function ReasoningStatus(props: {
    steps?: any;
    autoplay?: any;
    defaultOpen?: any;
    failAt?: any;
}): any;
/** Riassunto in cima. */
export declare function SummaryTop(props: {
    points?: any;
    more?: any;
    sources?: any;
    state?: any;
    title?: any;
    pages?: any;
}): any;
/** Lista da riordinare con molla. */
export declare function SpringList(props: {
    items?: any;
    rowH?: any;
}): any;
/** Selezione a lazo. */
export declare function LassoSelect(props: {
    items?: any;
    height?: any;
}): any;
/** Dock con ingrandimento. */
export declare function Dock(props: {
    apps?: any;
    max?: any;
    range?: any;
}): any;
/** Bottone magnetico. */
export declare function MagneticButton(props: {
    children?: any;
    icon?: any;
    strength?: any;
    radius?: any;
    round?: any;
    variant?: any;
    onClick?: any;
}): any;
/** Festa del traguardo. */
export declare function Celebration(props: {
    title?: any;
    text?: any;
    value?: any;
    unit?: any;
    icon?: any;
    autoplay?: any;
}): any;
/** Tira per aggiornare. */
export declare function PullToRefresh(props: {
    items?: any;
    fresh?: any;
    fail?: any;
    height?: any;
}): any;
/** Zoom sulla linea del tempo. */
export declare function TimelineZoom(props: {
    events?: any;
    year?: any;
}): any;
/** Numero con le cifre che girano. */
export declare function Roller(props: {
    value?: any;
    decimals?: any;
    prefix?: any;
    suffix?: any;
}): any;
/** Numeri a rullo. */
export declare function RollingStat(props: {
    label?: any;
    value?: any;
    decimals?: any;
    prefix?: any;
    live?: any;
}): any;
/** Disfa con la cronologia. */
export declare function UndoHistory(props?: {}): any;
/** Storie a schermo intero. */
export declare function Stories(props: {
    stories?: any;
    duration?: any;
    author?: any;
    start?: any;
    paused?: any;
}): any;
/** Presentazione dell'app. */
export declare function AppIntro(props: {
    slides?: any;
    onDone?: any;
}): any;
/** Widget per la schermata Home. */
export declare function HomeWidgets(props: {
    loading?: any;
    stale?: any;
}): any;
/** Scanner con mirino. */
export declare function Scanner(props: {
    state?: any;
    autoDetect?: any;
}): any;
/** Tastierino per l'importo. */
export declare function AmountPad(props: {
    max?: any;
    to?: any;
    quick?: any;
    defaultCents?: any;
    balance?: any;
}): any;
/** Attività in corso. */
export declare function LiveActivity(props: {
    step?: any;
    eta?: any;
    auto?: any;
    mode?: any;
}): any;
/** Scheda grande che si allarga. */
export declare function ExpandCard(props: {
    cards?: any;
}): any;
