import { useStore } from '@nanostores/solid';
import { Show, createSignal } from 'solid-js';
import { $cart as cart, subtotal, removeitemfromcart } from '../../stores/cart';
import styles from './cart.module.css';

function formatCurrency(amount: number) {
	return new Intl.NumberFormat('en-UK', {
		style: 'currency',
		currency: 'GBP',
	}).format(amount);
}
const EmptyState = () => (
	<>
		<p class={styles.icon}>
			<span role="img" aria-label="hot dog">
				🌭
			</span>
		</p>
		<p class={styles.empty}>
			Your cart is empty! Add ad sandwich kit or two and give flavor a chance!
		</p>
	</>
);

const CheckoutNotice = () => {
	return <p class={styles.notice}> Checkout is nto implemented yet.</p>;
};

export const Cart = () => {
	const [showNotice, setShowNotice] = createSignal(false);
	const $subtotal = useStore(subtotal);
	const $cart = useStore(cart);

	return (
		
		<aside class={styles.cart}>
			<h2>Your Cart</h2>
			<Show when={Object.values($cart()).length > 0} fallback={<EmptyState />}>
				<ul class={styles.items}>
					{Object.values($cart()).map((item: CartItem) => {
						if (!item) {
							return null;
						}
						return (
							<li class={styles.item}>
								<span class={styles.quantity}>{item.quantity} </span>
								<span class={styles.name}>{item.item.title} </span>
								<span class={styles.remove}>
									<button
										title="remove item"
										onClick={() => removeitemfromcart(item.item.id)}
									></button>
									&times{' '}
								</span>
								<span class={styles.price}>{item.item.price} </span>
							</li>
						);
					})}
				</ul>
				<div class={styles.details}>
					<p class={styles.subtotal}>
						<span class={styles.label}>Subtotal:</span>
						{''} {formatCurrency($subtotal())}
					</p>
					<p class={styles.shipping}>
						<span class={styles.label}>Shipping:</span>
						{''}
						<del>$10.00</del>
						<ins>Free</ins>
					</p>
					<p class={styles.total}>
						<span class={styles.label}>Subtotal:</span>
						{''} {formatCurrency($subtotal())}
					</p>
					<p>
						<button class="big-link " onClick={() => setShowNotice(true)}>
							Checkout
						</button>
					</p>

					<Show when={showNotice()}>
						<CheckoutNotice />
					</Show>
				</div>
			</Show>
		</aside>
	);
};
