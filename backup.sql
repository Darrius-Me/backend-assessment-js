--
-- PostgreSQL database dump
--

-- Dumped from database version 16.4
-- Dumped by pg_dump version 17.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: products; Type: TABLE; Schema: public; Owner: product_owner
--

CREATE TABLE public.products (
    id integer NOT NULL,
    "productID" bigint,
    title text,
    tags text,
    created_at date,
    updated_at date,
    sku text
);


ALTER TABLE public.products OWNER TO product_owner;

--
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: product_owner
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.products_id_seq OWNER TO product_owner;

--
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: product_owner
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- Name: products id; Type: DEFAULT; Schema: public; Owner: product_owner
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: product_owner
--

COPY public.products (id, "productID", title, tags, created_at, updated_at, sku) FROM stdin;
1	9505912586529	The Compare at Price Snowboard Mediummed-2	Accessory, Sport, Winter	2024-07-28	2024-07-28	med-2
12	9505912324385	The Complete Snowboard Icecomp-1	Premium, Snow, Snowboard, Sport, Winter	2024-06-28	2024-06-28	comp-1
13	9505912586529	The Compare at Price Snowboard Largelar-2	Accessory, Sport, Winter	2024-07-28	2024-07-28	lar-2
14	9505912586529	The Compare at Price Snowboard Mediummed-2	Accessory, Sport, Winter	2024-07-28	2024-07-28	med-2
15	9505912553761	The Inventory Not Tracked Snowboard Default Titlesku-untracked-1	Accessory, Sport, Winter	2024-06-28	2024-06-28	sku-untracked-1
11	9505912422689	The Draft Snowboard Default Titledraft-1		2024-06-28	2024-06-28	draft-1
10	9505912324385	The Complete Snowboard Sunsetcomp-5	Premium, Snow, Snowboard, Sport, Winter	2024-06-28	2024-06-28	comp-5
3	9505912324385	The Complete Snowboard Powdercomp-3	Premium, Snow, Snowboard, Sport, Winter	2024-06-28	2024-06-28	comp-3
4	9505912586529	The Compare at Price Snowboard Largelar-2	Accessory, Sport, Winter	2024-07-28	2024-07-28	lar-2
6	9505912357153	The Hidden Snowboard Default Titlehide-2	Premium, Snow, Snowboard, Sport, Winter	2024-06-28	2024-06-28	hide-2
16	9505912357153	The Hidden Snowboard Default Titlehide-2	Premium, Snow, Snowboard, Sport, Winter	2024-06-28	2024-06-28	hide-2
9	9505912324385	The Complete Snowboard Electriccomp-4	Premium, Snow, Snowboard, Sport, Winter	2024-06-28	2024-06-28	comp-4
5	9505912553761	The Inventory Not Tracked Snowboard Default Titlesku-untracked-1	Accessory, Sport, Winter	2024-06-28	2024-06-28	sku-untracked-1
7	9505912324385	The Complete Snowboard Dawncomp-2	Premium, Snow, Snowboard, Sport, Winter	2024-06-28	2024-06-28	comp-2
8	9505912324385	The Complete Snowboard Icecomp-1	Premium, Snow, Snowboard, Sport, Winter	2024-06-28	2024-06-28	comp-1
17	9505912324385	The Complete Snowboard Dawncomp-2	Premium, Snow, Snowboard, Sport, Winter	2024-06-28	2024-06-28	comp-2
18	9505912324385	The Complete Snowboard Sunsetcomp-5	Premium, Snow, Snowboard, Sport, Winter	2024-06-28	2024-06-28	comp-5
19	9505912422689	The Draft Snowboard Default Titledraft-1		2024-06-28	2024-06-28	draft-1
21	9505912324385	The Complete Snowboard Electriccomp-4	Premium, Snow, Snowboard, Sport, Winter	2024-06-28	2024-06-28	comp-4
20	9505912324385	The Complete Snowboard Powdercomp-3	Premium, Snow, Snowboard, Sport, Winter	2024-06-28	2024-06-28	comp-3
22	9505912455457	The Out of Stock Snowboard Default Titleoos-1	Accessory, Sport, Winter	2024-06-28	2024-06-28	oos-1
\.


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: product_owner
--

SELECT pg_catalog.setval('public.products_id_seq', 22, true);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: product_owner
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO neon_superuser WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO neon_superuser WITH GRANT OPTION;


--
-- PostgreSQL database dump complete
--

