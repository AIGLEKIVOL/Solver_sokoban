(define (domain Sokoban)
    (:requirements :strips :typing :negative-preconditions :disjunctive-preconditions)
    (:types player box tile)
    (:predicates
        (playerAt ?t - tile)
        (boxAt ?t - tile)
        (isEmpty ?t - tile)
        (isRight ?t1?t2 - tile)
        (isLeft ?t1?t2 - tile)
        (isUp ?t1?t2 - tile)
        (isDown ?t1?t2 - tile)    
    )
    (:action moveUp
        :parameters (?from - tile ?to - tile)
        :precondition (and(playerAt ?from)(isEmpty ?to)(isUp ?to ?from))
        :effect (and (playerAt ?to)not(playerAt ?from)(isEmpty ?from)not(isEmpty ?to))
    )
    (:action moveLeft
        :parameters (?from - tile ?to - tile)
        :precondition (and(playerAt ?from)(isEmpty ?to)(isLeft ?to ?from))
        :effect (and (playerAt ?to)not(playerAt ?from)(isEmpty ?from)not(isEmpty ?to))
    )
    (:action moveRight
        :parameters (?from - tile ?to - tile)
        :precondition (and(playerAt ?from)(isEmpty ?to)(isRight ?to ?from))
        :effect (and (playerAt ?to)not(playerAt ?from)(isEmpty ?from)not(isEmpty ?to))
    )
    (:action moveDown
        :parameters (?from - tile ?to - tile)
        :precondition (and(playerAt ?from)(isEmpty ?to)(isDown ?to ?from))
        :effect (and (playerAt ?to)not(playerAt ?from)(isEmpty ?from)not(isEmpty ?to))
    )

    (:action pushUp
        :parameters (?pFrom - tile ?bFrom - tile ?to - tile)
        :precondition (and(playerAt ?pFrom)(isEmpty ?to)(isUp ?to ?bFrom)(isUp ?bFrom ?pFrom)(boxAt ?bFrom))
        :effect (and (playerAt ?bFrom)not(playerAt ?pFrom)(isEmpty ?pFrom)not(boxAt ?bFrom)(boxAt ?to))
    )
    (:action pushDown
        :parameters (?pFrom - tile ?bFrom - tile ?to - tile)
        :precondition (and(playerAt ?pFrom)(isEmpty ?to)(isDown ?to ?bFrom)(isDown ?bFrom ?pFrom)(boxAt ?bFrom))
        :effect (and (playerAt ?bFrom)not(playerAt ?pFrom)(isEmpty ?pFrom)not(boxAt ?bFrom)(boxAt ?to))
    )
    (:action pushLeft
        :parameters (?pFrom - tile ?bFrom - tile ?to - tile)
        :precondition (and(playerAt ?pFrom)(isEmpty ?to)(isLeft ?to ?bFrom)(isLeft ?bFrom ?pFrom)(boxAt ?bFrom))
        :effect (and (playerAt ?bFrom)not(playerAt ?pFrom)(isEmpty ?pFrom)not(boxAt ?bFrom)(boxAt ?to))
    )
    (:action pushRight
        :parameters (?pFrom - tile ?bFrom - tile ?to - tile)
        :precondition (and(playerAt ?pFrom)(isEmpty ?to)(isRight ?to ?bFrom)(isRight ?bFrom ?pFrom)(boxAt ?bFrom))
        :effect (and (playerAt ?bFrom)not(playerAt ?pFrom)(isEmpty ?pFrom)not(boxAt ?bFrom)(boxAt ?to))
    )

)