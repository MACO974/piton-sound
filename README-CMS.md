# Piton Sound — site avec interface d'administration

Site vitrine de démonstration MA & CO, avec un CMS permettant au client de modifier
son contenu lui-même, sans toucher au code.

## Comment c'est construit

| Élément | Rôle |
|---|---|
| `src/index.njk` | Le gabarit de la page : structure HTML et style. **C'est vous qui y touchez.** |
| `src/_data/infos.json` | Tout le contenu texte du site. **C'est ce que le client modifie**, sans jamais ouvrir le fichier. |
| `src/admin/` | L'interface d'administration (Decap CMS) et sa configuration. |
| `_site/` | Le site final généré. Ne jamais le modifier à la main, il est réécrit à chaque build. |

Eleventy prend le gabarit, y injecte le contenu du JSON, et produit du HTML pur.
Le résultat est aussi rapide et aussi bien référencé qu'un site codé à la main.

## Travailler en local

```
npm install          (une seule fois)
npm run cms          dans un premier terminal
npm start            dans un second terminal
```

Le site est sur http://localhost:8080
L'interface d'administration sur http://localhost:8080/admin/

En local, `local_backend: true` dans `src/admin/config.yml` permet de se connecter
sans mot de passe. Pratique pour tester, à désactiver pour la mise en ligne.

## Mettre en ligne sur Netlify

1. Dans Netlify, **Add new project → Import an existing project → GitHub**
2. Choisir le dépôt `piton-sound`
3. Netlify lit `netlify.toml` et trouve tout seul la commande de build et le dossier à publier
4. Déployer

À partir de là, chaque modification publiée depuis l'interface d'administration
déclenche automatiquement un nouveau déploiement.

## Donner l'accès au client (DecapBridge) — DÉJÀ CONFIGURÉ

Netlify a supprimé son service d'authentification. On passe donc par DecapBridge,
qui permet au client de se connecter avec Google, Microsoft ou un simple mot de passe,
**sans avoir besoin d'un compte GitHub**.

C'est en place pour ce site. Pour inviter quelqu'un :

1. Aller sur https://decapbridge.com/dashboard/sites
2. Ouvrir le site **Piton Sound**
3. Inviter la personne par email

Elle reçoit un mail, choisit son mode de connexion, et arrive dans l'interface.
Si elle oublie son mot de passe, elle le réinitialise seule.

Chaque modification est signée par son auteur dans l'historique GitHub, on sait donc
toujours qui a changé quoi.

**Le jeton GitHub** utilisé par DecapBridge a une date d'expiration. Quand elle approche,
en régénérer un sur https://github.com/settings/personal-access-tokens et le remplacer
dans DecapBridge, sinon le CMS cessera d'enregistrer sans prévenir.

Le client reçoit un mail, choisit son mode de connexion, et arrive directement
dans l'interface. S'il oublie son mot de passe, il le réinitialise seul.

## Ce que le client peut modifier

Nom de l'entreprise, bandeau d'accueil, bandeau défilant, prestations, formules et tarifs,
références, avis clients, coordonnées.

Il ne peut pas casser la mise en page : il ne voit que des champs de texte, jamais le code.

## Réutiliser cette structure pour un autre client

1. Copier le dossier
2. Remplacer le contenu de `src/_data/infos.json`
3. Adapter `src/index.njk` au métier du client
4. Adapter les libellés dans `src/admin/config.yml`
5. Nouveau dépôt GitHub, nouveau projet Netlify, nouveau site DecapBridge

Le squelette est fait une fois, les sites suivants vont beaucoup plus vite.
